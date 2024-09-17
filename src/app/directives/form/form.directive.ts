import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';

import { guid } from '@firestitch/common';
import { DrawerRef } from '@firestitch/drawer';
import { FsMessage, MessageMode } from '@firestitch/message';

import {
  BehaviorSubject,
  defer,
  fromEvent,
  iif,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import {
  catchError,
  delay,
  filter,
  first,
  map,
  mapTo,
  mergeMap,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { FormDeactivateGuard } from '../../guards/form-deactivate.guard';
import { confirmResultContinue } from '../../helpers/confirm-result-continue';
import { getActiveRoute } from '../../helpers/get-active-route';
import { getFormErrors } from '../../helpers/get-form-errors';
import { FsForm } from '../../services/fsform.service';
import { FsButtonDirective } from '../button.directive';

import { ConfirmResult } from './../../enums/confirm-result';
import { FormStatus } from './../../enums/form-status';
import { ConfirmConfig, ConfirmTabGroup, SubmittedEvent } from './../../interfaces';
import { SubmitEvent } from './../../interfaces/submit-event';


@Directive({
  selector: '[fsForm]',
  exportAs: 'fsForm',
})
export class FsFormDirective implements OnInit, OnDestroy, AfterContentInit, OnChanges {

  @Input()
  public wrapperSelector = '.fs-form-wrapper,.mat-form-field';

  @Input()
  public messageSelector = '.fs-form-message,.mat-form-field-subscript-wrapper';

  @Input()
  public hintSelector = '.fs-form-hint,.mat-form-field-hint-wrapper';

  @Input()
  public labelSelector = '.fs-form-label,.mat-form-field-label';

  @Input()
  public autocomplete = false;

  @Input()
  public shortcuts = true; // Ctrl + s

  @Input()
  public confirm: ConfirmConfig | boolean = true;

  @Input()
  public confirmDialog = true;

  @Input()
  public confirmDrawer = true;

  @Input()
  public confirmBrowser = true;

  @Input()
  public confirmTabs = true;

  @Input()
  public dirtySubmitButton = true;

  @Input()
  public set submit(submit$: (event: SubmitEvent) => Observable<any>) {
    this._submit$ = submit$;
  }

  public get submit(): (event: SubmitEvent) => Observable<any> {
    return this._submit$;
  }

  @Input()
  public successDelay = 0;

  @Input()
  public errorDelay = 1000;

  @Input()
  public tabGroup: MatTabGroup;

  @Input()
  public deactivationGuard = true;

  @Output('fsForm')
  public submitEvent: EventEmitter<SubmitEvent> = new EventEmitter();

  @Output()
  public invalid: EventEmitter<SubmitEvent> = new EventEmitter();

  @Output()
  public valid: EventEmitter<SubmitEvent> = new EventEmitter();

  @Output()
  public submitted: EventEmitter<SubmitEvent> = new EventEmitter();

  @Output()
  public reseted: EventEmitter<SubmitEvent> = new EventEmitter();

  @Output()
  public cleared: EventEmitter<SubmitEvent> = new EventEmitter();

  @HostBinding('class.fs-form')
  public fsFormClass = true;

  @ContentChildren(MatTabGroup, { descendants: true })
  private _tabGroups: QueryList<MatTabGroup> = new QueryList();

  private _buttons = new QueryList<FsButtonDirective>();
  private _registerControl;
  private _activeSubmitButton: FsButtonDirective;
  private _dialogBackdropEscape = false;
  private _snapshot: { [key: string]: any } = {};
  private _activatedRouteConfig: Route | null;
  private _status$ = new BehaviorSubject(FormStatus.Valid);
  private _destroy$ = new Subject();
  private _confirmed = false;
  private _submit$: (event: SubmitEvent) => Observable<any> = null;

  constructor(
    @Inject(NgForm)
    public ngForm: NgForm,
    private _form: FsForm,
    private _element: ElementRef,
    private _message: FsMessage,
    private _ngZone: NgZone,
    private _cdRef: ChangeDetectorRef,

    @Optional() @Inject(MatDialogRef)
    private _dialogRef: MatDialogRef<any>,

    @Optional() @Inject(DrawerRef)
    private _drawerRef: DrawerRef<any>,

    private _route: ActivatedRoute,
  ) { }

  public get submitting(): boolean {
    return this._status$.getValue() === FormStatus.Submitting;
  }

  public get validating(): boolean {
    return this._status$.getValue() === FormStatus.Validating;
  }

  public get completing(): boolean {
    return this._status$.getValue() === FormStatus.Completing;
  }

  private get _submitEvent(): SubmitEvent {
    return {
      ngForm: this.ngForm,
      submitter: this._submitter,
    };
  }

  private get _formValidState$(): Observable<SubmittedEvent> {
    this._form.broadcast('valid', this._submitEvent);
    this.submitEvent.emit(this._submitEvent);
    this.valid.emit(this._submitEvent);

    const submittedEvent: SubmittedEvent = {
      ngForm: this.ngForm,
      submitter: this._submitter,
      response: null,
    };

    const submit$: Observable<any> = this._submit$ ?
      this._submit$(this._submitEvent) : of(submittedEvent);

    return submit$
      .pipe(
        map((response) => {
          submittedEvent.response = response;

          return submittedEvent;
        }),
        takeUntil(this._destroy$),
      );
  }

  private get _formInvalidState$(): Observable<never> {
    this._form.broadcast('invalid', this._submitEvent);

    if (this.invalid) {
      this.invalid.emit(this._submitEvent);
    }

    const message = 'Please review errors highlighted in red';
    this._message.error(message, { mode: MessageMode.Toast });

    const el = this._element.nativeElement.querySelector('.ng-invalid');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    return throwError('Form validation error');
  }

  private get _submitter(): string {
    return this._activeSubmitButton
      ? this._activeSubmitButton.name
      : null;
  }

  public ngOnInit() {
    if (this.deactivationGuard) {
      this._registerCanDeactivateGuard();
    }

    this._registerConfirmDialogBackdropEscape();
    this._listenHotKeys();
    this._listenWindowClose();
    this._listenSubmit();
    this._listenFormStatus();

    if (!this.autocomplete) {
      this._registerAutocomplete();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.confirm) {
      this._updateDirtySubmitButtons();
    }
  }

  public clearSubmit(): void {
    this._submit$ = null;

    setTimeout(() => {
      this._cdRef.markForCheck();
    });
  }

  public registerSubmit(submit$: () => Observable<any>): void {
    this._submit$ = submit$;

    setTimeout(() => {
      this._cdRef.markForCheck();
    });
  }

  public ngAfterContentInit(): void {
    this._registerConfirm();
    this._registerConfirmDrawerClose();
    this._registerConfirmTabs();
    this._registerDrawerClose();
    this._registerDirtySubmitButton();
  }

  public ngOnDestroy(): void {
    this._cleanupCanDeactivate();
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createSnapshot(): void {
    this._snapshot = this.ngForm.value;
  }

  public getSnapshot(): { [key: string]: any } {
    return this._snapshot || {};
  }

  public reset(): void {
    this.ngForm.resetForm();

    Object.keys(this.ngForm.controls)
      .forEach((name: string) => {
        const control = this.ngForm.controls[name];
        control.reset(this._snapshot[name]);
      });

    this.reseted.emit();
  }

  public clear(): void {
    this.ngForm.resetForm();
    this.cleared.emit();
  }

  public dirty(): void {
    this.ngForm.form.markAsDirty();
    this._updateDirtySubmitButtons();
  }

  public triggerSubmit(options?: { confirmed: boolean }): void {
    this._confirmed = options?.confirmed;
    this.ngForm.ngSubmit.emit();
  }

  public triggerConfirm(): Observable<ConfirmResult> {
    const submitted = this.submitting ? this.submitted.asObservable() : of({});

    return submitted
      .pipe(
        take(1),
        mergeMap(() => this._form.confirmUnsaved([this])),
      );
  }

  public enable(): void {
    this.ngForm.control.enable();

    this._updateDirtySubmitButtons();
  }

  public disable(): void {
    this.ngForm.control.disable();

    this._buttons.forEach((button) => {
      button.disable();
    });
  }

  public addButton(button: FsButtonDirective): void {
    this._buttons.reset(
      [
        ...this._buttons.toArray(),
        button,
      ]);
  }

  public removeButton(button: FsButtonDirective): void {
    this._buttons.reset(
      [
        ...this._buttons.toArray()
          .filter((item) => (button !== item)),
      ]);
  }

  public validate(): void {
    Object.values(this.ngForm.controls)
      .forEach((control) => {
        control.markAsDirty();
        control.markAsTouched();
        control.updateValueAndValidity();
      });
  }

  private _listenSubmit(): void {
    this.ngForm
      .ngSubmit
      .pipe(
        tap((event) => {
          event?.preventDefault();
        }),
        map((event) => {
          return { event, confirmed: this._confirmed };
        }),
        tap(() => this._confirmed = false),
        filter(() => {
          return [FormStatus.Valid, FormStatus.Invalid]
            .includes(this._status$.getValue());
        }),
        tap(() => this._broadcasValidatingEvents()),
        tap(() => this.validate()),
        tap(() => this._broadcastSubmittingEvents()),
        switchMap((data) => this._waitUntilStatusPending()
          .pipe(
            mapTo(data),
          )),
        tap(() => this._setupActiveSubmitButton()),
        tap(() => this._disableButtons()),
        mergeMap((data) => {
          if (this.ngForm.status === 'INVALID') {
            return this._formInvalidState$;
          }

          return this._formValidState$
            .pipe(
              map((submitEvent) => ({
                ...submitEvent,
                confirmed: data.confirmed,
              }),
              ),
            );
        }),
        catchError((e, source$) => {
          this._handleError(e);

          return source$;
        }),
        tap((submittedEvent: SubmittedEvent) => {
          this._completeSubmit(true, submittedEvent);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  private _listenFormStatus(): void {
    this._status$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((formStatus: FormStatus) => {
        const cls = [FormStatus.Submitting, FormStatus.Validating];
        const classList = this._element.nativeElement.classList;
        classList.remove(...cls);
        if (cls.indexOf(formStatus) !== -1) {
          classList.add(formStatus);
        }
      });

  }

  private _listenWindowClose(): void {
    fromEvent(window, 'beforeunload')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((event: Event) => {
        if (this.confirm && this.confirmBrowser && this.ngForm.dirty) {
          event.returnValue = false;
        }
      });
  }

  private _activeDialog(el, dialog: HTMLElement): boolean {
    if (el.isSameNode(dialog)) {
      return true;
    } else if (el.parentElement) {
      return this._activeDialog(el.parentElement, dialog);
    }

    return false;
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
              if (this._elementInForm(document.activeElement)) {
                this.ngForm.ngSubmit.next();
              }
            }
          }
        });
    });
  }

  private _formClose(): void {
    if (this.confirm && this.confirmDialog) {
      this.triggerConfirm()
        .pipe(
          filter((result) => confirmResultContinue(result)),
          switchMap((result) => {
            return result === ConfirmResult.Pristine || result === ConfirmResult.Discard
              ? of(null)
              : this.submitted.asObservable();
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

  private _getActiveSubmitButton(): FsButtonDirective {
    const submitButtons = this._buttons
      .filter((button) => button.submit);

    const activeButton = submitButtons
      .find((button) => {
        return button.active;
      });

    return activeButton ? activeButton : submitButtons[0];
  }

  private _elementInForm(el: Element): boolean {
    if (el.isSameNode(this._element.nativeElement)) {
      return true;
    } else if (el.parentElement) {
      return this._elementInForm(el.parentElement);
    }

    return false;
  }

  private _completeSubmit(success, submitEvent: SubmittedEvent): void {
    if (success) {
      this.ngForm.control.markAsPristine();
      this.createSnapshot();
      this.submitted.emit(submitEvent);
    } else {
      this._resetButtons();
    }

    if (this._activeSubmitButton) {
      if (success) {
        this._activeSubmitButton.success();
      } else {
        this._activeSubmitButton.error();
      }
    }

    this._status$.next(FormStatus.Submitted);

    if (success) {
      this._status$.next(FormStatus.Success);
    } else {
      this._status$.next(FormStatus.Error);
    }

    this._status$.next(FormStatus.Completing);

    const resetDelay = success ? this.successDelay : this.errorDelay;

    of(true)
      .pipe(
        delay(resetDelay),
        first(),
        takeUntil(this._destroy$),
      ).subscribe(() => {
        if (this.ngForm.form.status === 'VALID') {
          this._status$.next(FormStatus.Valid);
        } else {
          this._status$.next(FormStatus.Invalid);
        }

        this._resetButtons();
        this._resetActiveButtons();
        this._updateDirtySubmitButtons();
      });
  }

  private _resetButtons(): void {
    this._buttons.forEach((button) => {
      button.reset();
    });
  }

  private _resetActiveButtons(): void {
    this._buttons.forEach((button) => {
      button.resetActive();
    });
  }

  private _registerConfirm(): void {
    this.ngForm.form.valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((changes) => {
        if(this._dialogBackdropEscape && this._dialogRef) {
          this._dialogRef.disableClose = true;
        }

        if (this.confirm) {
          const existing = Object.keys(this._snapshot);

          Object.keys(changes)
            .forEach((name: string) => {
              if (existing.indexOf(name) === -1) {
                this._snapshot[name] = changes[name];
              }
            });
        }
      });
  }

  private _registerDrawerClose(): void {
    if (this._drawerRef) {
      this._drawerRef.closeStart$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((subscriber) => {
          if (this.submitting) {
            this._status$
              .pipe(
                filter((status) => status === FormStatus.Success || status === FormStatus.Error),
                takeUntil(this._destroy$),
              )
              .subscribe((status) => {
                if (status === FormStatus.Success) {
                  subscriber.next();
                  subscriber.complete();
                } else {
                  subscriber.error();
                }
              });
          } else {
            subscriber.next();
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
              () => this.confirm && this.confirmDrawer,
              this.triggerConfirm()
                .pipe(
                  map((result) => confirmResultContinue(result)),
                  tap((result) => {
                    if (result) {
                      subscriber.next();
                      subscriber.complete();
                    }
                  }),
                ),
              defer(() => {
                subscriber.next();
                subscriber.complete();
              }),
            );
          }),
          takeUntil(this._destroy$),
        )
        .subscribe();
    }
  }

  private _registerConfirmTabs(): void {
    if (this.tabGroup) {
      this._registerConfirmTabGroup(this.tabGroup);
    }

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

  private _registerAutocomplete(): void {
    this._registerControl = this.ngForm.form.registerControl.bind(this.ngForm.form);

    this.ngForm.form.registerControl = (name: string, control: AbstractControl) => {

      const el: Element = this._element.nativeElement.querySelector(`input[name='${name}']`);

      if (el) {
        if (!el.getAttribute('autocomplete')) {
          el.setAttribute('autocomplete', 'none');
          el.setAttribute('name', `${name}-${guid()}`);
        }
      }

      return this._registerControl(name, control);
    };
  }

  private _registerDirtySubmitButton(): void {
    if (!this.ngForm) {
      return;
    }

    this.ngForm.form.valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._updateDirtySubmitButtons();
      });

    this._buttons.changes
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._updateDirtySubmitButtons();
      });
  }

  private _updateDirtySubmitButtons(): void {
    this._buttons
      .filter((button) => button.submit)
      .forEach((submitButton: FsButtonDirective) => {
        if (!this.confirm || !this.dirtySubmitButton || this.ngForm.dirty || !submitButton.dirtySubmit) {
          submitButton.enable();
        } else {
          submitButton.disable();
        }
      });
  }

  private _broadcastSubmittingEvents(): void {
    this._status$.next(FormStatus.Submitting);
    this._form.broadcast('submit', this.ngForm);
  }

  private _broadcasValidatingEvents(): void {
    this._status$.next(FormStatus.Validating);
  }

  private _setupActiveSubmitButton(): void {
    this._activeSubmitButton = this._getActiveSubmitButton();
    this._resetButtons();

    if (this._activeSubmitButton) {
      this._activeSubmitButton.process();
    }
  }

  private _disableButtons(): void {
    this._buttons.forEach((button) => {
      button.disable();
    });
  }

  private _waitUntilStatusPending(): Observable<string> {
    return this.ngForm.statusChanges
      .pipe(
        startWith(this.ngForm.status),
        first((state) => state !== 'PENDING'),
      );
  }

  private _handleError(e: SubmittedEvent) {
    console.log('%c Form Submit ', 'color: white; background-color: #D33F49', 'Error occured');
    console.group('Error Details:');
    console.log('Message: ', e);
    console.log('FormRef: ', this);

    if (this.ngForm.invalid) {
      const errors = getFormErrors(this.ngForm.control, null);
      console.log('Validation Errors: ', errors);
    }

    console.groupEnd();
    this._completeSubmit(false, null);
  }

  private _registerCanDeactivateGuard(): void {
    this._activatedRouteConfig = getActiveRoute(this._route).routeConfig;

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

    const guardIndex = this._activatedRouteConfig.canDeactivate.indexOf(FormDeactivateGuard);
    this._activatedRouteConfig.canDeactivate.splice(guardIndex, 1);

    this._form.removeFormDirective(this._activatedRouteConfig.component);
  }

}
