import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';

import { DrawerRef } from '@firestitch/drawer';

import { defer, fromEvent, iif, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ConfirmResult } from '../../enums';
import { FormStatus } from '../../enums/form-status';
import { FormDeactivateGuard } from '../../guards/form-deactivate.guard';
import { confirmResultContinue } from '../../helpers';
import { getActiveRoute } from '../../helpers/get-active-route';
import { ConfirmConfig, ConfirmTabGroup, SubmitEvent, SubmittedEvent } from '../../interfaces';
import { FsForm } from '../../services/fsform.service';
import { FsButtonDirective } from '../button.directive';
import type { FsFormDirective } from '../form/form.directive';


/**
 * Shared by the two things that can own a set of forms: an `fsForm` sitting at
 * the root of its linked set, and an `fsFormContainer` holding forms that are
 * siblings rather than nested.
 *
 * It holds the submit-button registry both of them expose to buttons, and the
 * lifecycle that belongs to the set as a whole rather than to any one form -
 * the dialog backdrop and Escape, Ctrl+S, the browser close prompt, the drawer
 * and tab-switch confirms. Exactly one owner registers that lifecycle; see
 * `_registerOwnerLifecycle`.
 */
@Directive()
export abstract class FsFormBaseDirective implements OnInit, AfterContentInit, OnDestroy {

  @Input()
  public confirmTabs = true;

  @Input()
  public confirm: ConfirmConfig | boolean = true;

  @Input()
  public confirmDialog = true;

  @Input()
  public confirmDrawer = true;

  @Input()
  public confirmBrowser = true;

  @Input()
  public shortcuts = true; // Ctrl + s

  @Input()
  public deactivationGuard = true;

  protected _ngZone = inject(NgZone);
  protected _cdRef = inject(ChangeDetectorRef);
  protected _element = inject(ElementRef);
  protected _form = inject(FsForm);
  protected _route = inject(ActivatedRoute);
  protected _dialogRef = inject<MatDialogRef<any>>(MatDialogRef, { optional: true });
  protected _drawerRef = inject<DrawerRef<any>>(DrawerRef, { optional: true });
  protected _dialogBackdropEscape = false;
  protected _activatedRouteConfig: Route | null;

  @ContentChildren(MatTabGroup, { descendants: true })
  private _tabGroups: QueryList<MatTabGroup> = new QueryList();

  private _buttons = new QueryList<FsButtonDirective>();
  private _activeSubmitButton: FsButtonDirective;
  private _confirmTabGroups = new WeakSet<MatTabGroup>();
  private _destroy$ = new Subject<void>();

  public abstract submitting: boolean;

  /**
   * True when anything in the owned set has a submit handler - i.e. there is
   * something for a Save button to do. Both a form and a container answer this
   * over their linked set, so whichever one owns a footer can be asked the same
   * question without knowing which it got.
   */
  public abstract submits: boolean;

  /** True when anything in the owned set has unsaved changes. */
  public abstract dirtyLinked: boolean;

  /** Every form in the owned set, at any depth. */
  public abstract linkedForms: FsFormDirective[];

  /** Emits whenever the owned set's dirty state may have moved. */
  public abstract dirtyChange$: Observable<void>;

  /** Emits once a submit over the owned set has completed successfully. */
  public abstract submitted$: Observable<SubmittedEvent>;

  /** Tracks the owned set's submit lifecycle, so the drawer can wait one out. */
  public abstract status$: Observable<FormStatus>;

  /**
   * The dialog this owner lives in, or null outside one. Used to keep a form set
   * from spanning a dialog boundary - see `withinSameDialog`.
   */
  public get dialogRef(): MatDialogRef<any> {
    return this._dialogRef;
  }

  public ngOnInit(): void {
    this._registerOwnerLifecycle();
  }

  public ngAfterContentInit(): void {
    this._registerOwnerContentLifecycle();
  }

  public get destroy$(): Observable<void> {
    return this._destroy$.asObservable();
  }

  public ngOnDestroy(): void {
    this._cleanupCanDeactivate();
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public get buttons(): QueryList<FsButtonDirective> {
    return this._buttons;
  }

  public get activeSubmitButton(): FsButtonDirective {
    return this._activeSubmitButton;
  }

  public set activeSubmitButton(button: FsButtonDirective) {
    this._activeSubmitButton = button;
  }

  /**
   * Bring a tab group into this owner's unsaved-changes confirm.
   *
   * `_tabGroups` only reaches groups in this owner's projected content, so a group
   * declared inside a child component's own template has to announce itself.
   * `fsFormConfirmTabs` calls this - consumers never call it directly.
   */
  public registerTabGroup(tabGroup: MatTabGroup): void {
    this._registerConfirmTabGroup(tabGroup);
  }

  public addButton(button: FsButtonDirective): void {
    this._buttons
      .reset(
        [
          ...this._buttons.toArray(),
          button,
        ]);

    // QueryList.reset() does not emit `changes`; notify so subscribers (e.g. the
    // form's dirty-submit-button tracking) react to buttons being registered.
    this._buttons.notifyOnChanges();
  }

  public removeButton(button: FsButtonDirective): void {
    if(this._activeSubmitButton === button) {
      this._activeSubmitButton = null;
    }

    this._buttons.reset(
      [
        ...this._buttons.toArray()
          .filter((item) => (button !== item)),
      ]);

    this._buttons.notifyOnChanges();
  }

  /**
   * Everything here acts on the form set as a whole, so exactly one thing may
   * register it. A form linked into a parent defers to that parent; every form
   * inside a container defers to the container. Registering twice would put two
   * confirms on the same backdrop click and two handlers on the same Ctrl+S.
   */
  protected _registerOwnerLifecycle(): void {
    if (this.deactivationGuard) {
      this._registerCanDeactivateGuard();
    }

    this._registerConfirmDialogBackdropEscape();
    this._listenHotKeys();
    this._listenWindowClose();
  }

  /** The half of the same ownership that needs projected content resolved. */
  protected _registerOwnerContentLifecycle(): void {
    this._registerConfirmTabs();
    this._registerConfirmDrawerClose();
    this._registerDrawerClose();
  }

  /**
   * Whether the element is inside what this owner covers. Overridden by the
   * container, whose own element is a poor proxy: it may be an `<ng-container>`,
   * which is a comment node and contains nothing.
   */
  protected _containsElement(el: Element): boolean {
    return this._nodeContains(this._element.nativeElement, el);
  }

  protected _nodeContains(root: Node, el: Element): boolean {
    if (!root || !el) {
      return false;
    }

    if (el === root) {
      return true;
    }

    return el.parentElement ? this._nodeContains(root, el.parentElement) : false;
  }

  protected _formClose(): void {
    if (this.confirm && this.confirmDialog) {
      this.triggerConfirm()
        .pipe(
          filter((result) => confirmResultContinue(result)),
          switchMap((result) => {
            return result === ConfirmResult.NoChanges || result === ConfirmResult.Discard
              ? of(null)
              : this.submitted$;
          }),
          takeUntil(this._destroy$),
        )
        .subscribe((result: SubmittedEvent) => {
          this._dialogRef.close(result?.response);
        });
    } else {
      this._dialogRef.close(null);
    }
  }

  private _listenWindowClose(): void {
    fromEvent(window, 'beforeunload')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((event: Event) => {
        if (this.confirm && this.confirmBrowser && this.dirtyLinked) {
          event.returnValue = false;
        }
      });
  }

  private _activeDialog(el: Node, dialog: HTMLElement): boolean {
    return this._nodeContains(dialog, el as Element);
  }

  private _listenHotKeys(): void {
    this._ngZone.runOutsideAngular(() => {
      fromEvent(document, 'keydown')
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((event: KeyboardEvent) => {
          if (this._dialogBackdropEscape && event.code === 'Escape') {
            const cdkOverlayPane = Array
              .from(document.querySelectorAll<HTMLElement>('.cdk-overlay-pane')).pop();

            const activeDialog = this
              ._activeDialog(document.getElementById(this._dialogRef.id), cdkOverlayPane);

            if (activeDialog) {
              this._ngZone.run(() => {
                this._formClose();
              });
            }
          }

          if ((event.ctrlKey || event.metaKey) && event.code === 'KeyS') {
            event.preventDefault();

            if (this.shortcuts) {
              if (this._containsElement(document.activeElement)) {
                this._ngZone.run(() => {
                  this.triggerSubmit();
                });
              }
            }
          }
        });
    });
  }

  private _registerConfirmDialogBackdropEscape(): void {
    if(this._dialogRef) {
      this._dialogBackdropEscape = !this._dialogRef?.disableClose;

      if (this._dialogBackdropEscape) {
        this._dialogRef.backdropClick()
          .pipe(
            takeUntil(this._destroy$),
          )
          .subscribe(() => {
            this._formClose();
          });

        this._destroy$
          .subscribe(() => {
            this._dialogRef.disableClose = false;
          });
      }
    }
  }

  private _registerDrawerClose(): void {
    if (this._drawerRef) {
      this._drawerRef.closeStart$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((subscriber) => {
          if (this.submitting) {
            this.status$
              .pipe(
                filter((status) => status === FormStatus.Success || status === FormStatus.Error),
                takeUntil(this._destroy$),
              )
              .subscribe((status) => {
                if (status === FormStatus.Success) {
                  subscriber.next(null);
                  subscriber.complete();
                } else {
                  subscriber.error();
                }
              });
          } else {
            subscriber.next(null);
            subscriber.complete();
          }
        });
    }
  }

  private _registerConfirmDrawerClose(): void {
    if (this._drawerRef) {
      this._drawerRef.closeStart$
        .pipe(
          switchMap((subscriber) => {
            return iif(
              () => !!this.confirm && this.confirmDrawer,
              this.triggerConfirm()
                .pipe(
                  map((result) => confirmResultContinue(result)),
                  tap((result) => {
                    if (result) {
                      subscriber.next(null);
                      subscriber.complete();
                    }
                  }),
                ),
              defer(() => {
                subscriber.next(null);
                subscriber.complete();

                return of(null);
              }),
            );
          }),
          takeUntil(this._destroy$),
        )
        .subscribe();
    }
  }

  private _registerConfirmTabs(): void {
    this._registerConfirmTabGroups(this._tabGroups.toArray());
    this._tabGroups.changes
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._registerConfirmTabGroups(this._tabGroups.toArray());
      });
  }

  private _registerConfirmTabGroups(tabGroups: MatTabGroup[]): void {
    tabGroups.forEach((tabGroup: MatTabGroup) => {
      this._registerConfirmTabGroup(tabGroup);
    });
  }

  private _registerConfirmTabGroup(tabGroup: MatTabGroup): void {
    // `_tabGroups.changes` re-emits the whole list, not just what arrived, and it
    // emits every time a lazy tab body mounts a nested group. Groups already
    // wired therefore come back around - so without this the outer group
    // accumulates one subscription per emission, and a single click on it opens
    // that many stacked confirm dialogs.
    if (this._confirmTabGroups.has(tabGroup)) {
      return;
    }

    this._confirmTabGroups.add(tabGroup);

    const confirmTabGroup = tabGroup as ConfirmTabGroup;
    if (!confirmTabGroup._originalHandleClick) {
      confirmTabGroup._originalHandleClick = tabGroup._handleClick;
      confirmTabGroup._handlClick$ = new Subject<{
         tab: MatTab;
         tabHeader: MatTabHeader;
         idx: number
        }>();

      confirmTabGroup._handleClick = (tab: MatTab, tabHeader: MatTabHeader, idx: number) => {
        if (confirmTabGroup._handlClick$.observers.length) {
          confirmTabGroup._handlClick$.next({ tab, tabHeader, idx });
        } else {
          confirmTabGroup._originalHandleClick(tab, tabHeader, idx);
        }
      };
    }

    confirmTabGroup._handlClick$
      .pipe(
        filter(() => !this.submitting),
        switchMap((event) => {
          if(this.confirm && this.confirmTabs) {
            return this.triggerConfirm()
              .pipe(
                tap((result) => {
                  if (confirmResultContinue(result)) {
                    confirmTabGroup.selectedIndex = event.idx;
                  }
                }),
              );
          }

          confirmTabGroup._originalHandleClick(event.tab, event.tabHeader, event.idx);

          return of(null);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }


  private _registerCanDeactivateGuard(): void {
    this._activatedRouteConfig = getActiveRoute(this._route)?.routeConfig;

    if (!this._activatedRouteConfig) {
      return;
    }

    this._form.registerFormDirective(this._activatedRouteConfig.component, this);

    if (!Array.isArray(this._activatedRouteConfig.canDeactivate)) {
      this._activatedRouteConfig.canDeactivate = [];
    }

    if (this._activatedRouteConfig.canDeactivate.indexOf(FormDeactivateGuard) === -1) {
      this._activatedRouteConfig.canDeactivate.push(FormDeactivateGuard);
    }
  }

  private _cleanupCanDeactivate(): void {
    if (!this._activatedRouteConfig) {
      return;
    }

    // GUARDED THE SAME WAY REGISTRATION IS, and for the same reason the
    // registration above builds the array when it is missing.
    //
    // `routeConfig` is the router's own object, shared and cached for the life
    // of the route. A route that declares no `canDeactivate` has none until
    // registration creates one — so this cannot assume the array is here just
    // because registration ran. `getActiveRoute()` walks to the DEEPEST active
    // route, and destroy resolves it against whatever the router holds at
    // teardown, which is not always the config registration mutated: a
    // navigation that advances the route tree before the form's ngOnDestroy
    // fires leaves this pointing at a config whose `canDeactivate` was never
    // initialized, and `undefined.indexOf` throws mid-teardown. The form then
    // never finishes cleaning up and the next screen renders against half-torn
    // state — unstyled native inputs, a page that looks like it failed to boot.
    const guards = this._activatedRouteConfig.canDeactivate;

    if (Array.isArray(guards)) {
      const guardIndex = guards.indexOf(FormDeactivateGuard);

      if (guardIndex !== -1) {
        guards.splice(guardIndex, 1);
      }
    }

    this._form.removeFormDirective(this._activatedRouteConfig.component);
  }


  public abstract triggerSubmit(): void;
  public abstract triggerConfirm(): Observable<ConfirmResult>;
  public abstract reset(): void;
  public abstract submit$(event?: SubmitEvent): Observable<SubmittedEvent>;
}
