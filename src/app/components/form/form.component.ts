import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
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

import { MatDialogRef } from '@angular/material/dialog';
import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';

import { FsMessage, MessageMode } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common';
import { DrawerRef } from '@firestitch/drawer';

import {
  BehaviorSubject,
  fromEvent,
  isObservable,
  Observable,
  of,
  Subject,
  throwError
} from 'rxjs';
import {
  catchError,
  delay,
  filter,
  first,
  map,
  mergeMap,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';

import { confirmUnsaved } from '../../helpers/confirm-unsaved';
import { FsFormDialogCloseDirective } from '../../directives/form-dialog-close.directive';
import { FsSubmitButtonDirective } from './../../directives/submit-button.directive';
import { ConfigService } from './../../services/config.service';
import { DirtyConfirmConfig, SubmittedEvent } from './../../interfaces';
import { ConfirmResult } from './../../enums/confirm-result';
import { FsForm } from '../../services/fsform.service';
import { SubmitEvent } from './../../interfaces/submit-event';
import { FormStatus } from './../../enums/form-status';
import { confirmResultContinue } from '../../helpers/confirm-result-continue';
import { getFormErrors } from '../../helpers/get-form-errors';


@Component({
  selector: '[fsForm]',
  template: `<ng-content></ng-content>`,
  providers: [ ConfigService ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsFormComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {

  @ContentChildren(FsFormDialogCloseDirective, { descendants: true })
  _formDialogClose: QueryList<FsFormDialogCloseDirective>;

  @ContentChildren(MatTabGroup, { descendants: true })
  _tabGroups: QueryList<MatTabGroup> = new QueryList();

  @ContentChildren(FsSubmitButtonDirective, { descendants: true })
  _submitButtons: QueryList<FsSubmitButtonDirective>;

  @Input() wrapperSelector = '.fs-form-wrapper,.mat-form-field';
  @Input() messageSelector = '.fs-form-message,.mat-form-field-subscript-wrapper';
  @Input() hintSelector = '.fs-form-hint,.mat-form-field-hint-wrapper';
  @Input() labelSelector = '.fs-form-label,.mat-form-field-label';
  @Input() autocomplete = false;
  @Input() shortcuts = true; //Ctrl + s
  @Input() dirtyConfirm: DirtyConfirmConfig | boolean = true;
  @Input() dirtyConfirmDialog = true;
  @Input() dirtyConfirmDrawer = true;
  @Input() dirtyConfirmBrowser = true;
  @Input() dirtyConfirmTabs = true;
  @Input() dirtySubmitButton = true;
  @Input() submit: (event: SubmitEvent) => Observable<any>;
  @Output('fsForm') submitEvent: EventEmitter<SubmitEvent> = new EventEmitter();
  @Output() invalid: EventEmitter<SubmitEvent> = new EventEmitter();
  @Output() valid: EventEmitter<SubmitEvent> = new EventEmitter();
  @Output() submitted: EventEmitter<SubmitEvent> = new EventEmitter();
  @HostBinding('class.fs-form') fsformClass = true;

  private _destroy$ = new Subject();
  private _registerControl;
  private _activeSubmitButton: FsSubmitButtonDirective;
  private _dialogBackdropEscape = false;
  private _snapshot: { [key: string]: unknown } = {};
  private _status$ = new BehaviorSubject(FormStatus.Valid);

  constructor(
    private _form: FsForm,
    private _element: ElementRef,
    private _message: FsMessage,
    private _prompt: FsPrompt,
    private _configService: ConfigService,
    private _cdRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    @Inject(NgForm) public ngForm: NgForm,
    @Optional() @Inject(MatDialogRef) private _dialogRef: MatDialogRef<any>,
    @Optional() @Inject(DrawerRef) private _drawerRef: DrawerRef<any>,
  ) {}

  public get submitting(): boolean {
    return this._status$.getValue() === FormStatus.Submitting;
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
      response: null
    };

    if (!this.submit) {
      return of(submittedEvent);
    }

    const result = this.submit(this._submitEvent);

    if (!isObservable(result)) {
      return of(submittedEvent);
    }

    return result
      .pipe(
        map((response) => {
          submittedEvent.response = response;

          return submittedEvent;
        })
      );
  }

  private get _formInvalidState$(): Observable<never> {
    this._form.broadcast('invalid', this._submitEvent);

    if (this.invalid) {
      this.invalid.emit(this._submitEvent);
    }

    const message = 'Changes not saved. Please review errors highlighted in red.';
    this._message.error(message, { mode: MessageMode.Toast });


    return throwError('Form validation error');
  }

  private get _submitter(): string {
    return this._activeSubmitButton
      ? this._activeSubmitButton.name
      : null;
  }

  public ngOnInit() {
    this._configService.form = this;
    this._registerDirtyConfirmDialogBackdropEscape();

    if (!this.autocomplete) {
      this._registerAutocomplete();
    }

    this._listenHotKeys();
    this._listenWindowClose();
    this._listenSubmit();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.dirtyConfirm) {
      this._updateDirtySubmitButtons();
    }

  }

  public ngAfterContentInit(): void {
    this._registerDirtyConfirm();
    this._registerDirtyConfirmDialogClose();
    this._registerDirtyConfirmDrawerClose();
    this._registerDirtyConfirmTabs();
    this._registerDirtySubmitButton();
    this._registerDrawerClose();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createSnapshot(): void {
    this._snapshot = this.ngForm.value;
  }

  public reset(): void {
    this.ngForm.resetForm();

    Object.keys(this.ngForm.controls)
      .forEach((name: string) => {
        const control = this.ngForm.controls[name];
        control.reset(this._snapshot[name]);
      });
  }

  public clear(): void {
    this.ngForm.resetForm();
  }

  public dirty(): void {
    this.ngForm.form.markAsDirty();
    this._updateDirtySubmitButtons();
  }

  public confirm(): Observable<ConfirmResult> {
    const submitted = this.submitting ? this.submitted.asObservable() : of({});

    return submitted
      .pipe(
        take(1),
        mergeMap(() => confirmUnsaved(this, this._prompt)),
        takeUntil(this._destroy$),
      );
  }

  public enable(): void {
    this.ngForm.control.enable();

    this._updateDirtySubmitButtons();
  }

  public disable(): void {
    this.ngForm.control.disable();

    this._submitButtons.forEach((button) => {
      button.disable();
    });
  }

  private _listenSubmit(): void {
    this.ngForm
      .ngSubmit
      .pipe(
        tap((event) => {
          event?.preventDefault();
        }),
        filter(() => {
          return [ FormStatus.Valid, FormStatus.Invalid ]
            .includes(this._status$.getValue());
        }),
        tap(() => this._markControlsAsTouchedAndUpdateValidity()),
        tap(() => this._broadcastSubmittingEvents()),
        switchMap(() => this._waitUntilStatusPending()),
        tap(() => this._setupActiveSubmitButton()),
        mergeMap(() => {
          return this.ngForm.status === 'INVALID'
            ? this._formInvalidState$
            : this._formValidState$;
        }),
        catchError((e, source$) => {
          this._handleError(e);

          return source$;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((submittedEvent: SubmittedEvent) => {
        this._completeSubmit(true, submittedEvent);
      });
  }

  private _listenWindowClose(): void {
    fromEvent(window, 'beforeunload')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((event: Event) => {
        if (this.dirtyConfirm && this.dirtyConfirmBrowser && this.ngForm.dirty) {
          event.returnValue = false;
        }
      });
  }

  private _listenHotKeys(): void {
    this._ngZone.runOutsideAngular(() => {
      fromEvent(document, 'keydown')
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((event: KeyboardEvent) => {
          if (this._dialogBackdropEscape && event.code === 'Escape') {
            const dialog = document.getElementById(this._dialogRef.id);

            if ((event as any).path) {
              (event as any).path.forEach(item => {
                if (dialog === item) {
                  this._formClose();
                }
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

  private _formClose(value = null): void {
    if (this.dirtyConfirm && this.dirtyConfirmDialog) {
      this.confirm()
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((result) => {
          if (confirmResultContinue(result)) {
            this._dialogRef.close(value);
          }
        });
    } else {
      this._dialogRef.close(value);
    }
  }

  private _registerDialogClose(directive: FsFormDialogCloseDirective): void {
    if (!directive.registered) {
      directive.registered = true;

      directive.clicked$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this._formClose(null);
        });
    }
  }

  private _getActiveButton(): FsSubmitButtonDirective {
    const activeButton = this._submitButtons.find(button => {
      return button.active;
    });

    return activeButton ? activeButton : this._submitButtons.first;
  }

  private _elementInForm(el: Element): boolean {

    if (el.isSameNode(this._element.nativeElement)) {
      return true;
    } else if (el.parentElement) {
      return this._elementInForm(el.parentElement);
    }

    return false;
  }

  private _completeSubmit(success, submitEvent: SubmitEvent): void {
    if (this._activeSubmitButton) {
      this._resetButtons();
      if (success) {
        this._activeSubmitButton.success();
        this.ngForm.control.markAsPristine();
        this.createSnapshot();
        this.submitted.emit(submitEvent);
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

    of(true)
    .pipe(
      takeUntil(this._destroy$),
      delay(1500),
      first()
    ).subscribe(() => {
      if (this.ngForm.form.status === 'VALID') {
        this._status$.next(FormStatus.Valid);
      } else {
        this._status$.next(FormStatus.Invalid);
      }

      this._resetButtons();
      this._updateDirtySubmitButtons();
    });
  }

  private _resetButtons(): void {
    this._submitButtons.forEach((button) => {
      button.reset();
    });
  }

  private _registerDirtyConfirm(): void {
    this.ngForm.form.valueChanges
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((changes) => {
        if (this.dirtyConfirm) {
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


  private _registerDirtyConfirmDrawerClose(): void {

    if (this._drawerRef) {
      this._drawerRef.closeStart$
      .pipe(
        filter(() => (this.dirtyConfirm && this.dirtyConfirmDrawer)),
        switchMap((subscriber) => {
          return this.confirm()
            .pipe(
              map((result) => {
                return {
                  result,
                  subscriber,
                }
              }),
            );
        }),
        takeUntil(this._destroy$),
      )
      .subscribe(({result, subscriber}) => {
        if (confirmResultContinue(result)) {
          subscriber.next();
        } else {
          subscriber.error();
        }
        subscriber.complete();
      });
    }
  }

  private _registerDirtyConfirmTabs(): void {

    this._registerDirtyConfirmTabGroups();

    this._tabGroups.changes
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(() => {
      this._registerDirtyConfirmTabGroups();
    });
  }

  private _registerDirtyConfirmTabGroups(): void {
    this._tabGroups.forEach((tabGroup: any) => {
      if (!tabGroup._dirtyHandleClick) {
        tabGroup._dirtyHandleClick = tabGroup._handleClick;
        tabGroup._handleClick = (tab: MatTab, tabHeader: MatTabHeader, idx: number) => {
          if (!this.submitting) {
            if (this.dirtyConfirm && this.dirtyConfirmTabs) {
              this.confirm()
                .pipe(
                  takeUntil(this._destroy$),
                )
                .subscribe((result) => {
                  if (confirmResultContinue(result)) {
                    tabGroup.selectedIndex = idx;
                  }
                });
            } else {
              tabGroup._dirtyHandleClick(tab, tabHeader, idx);
            }
          }
        }
      }
    });
  }

  private _registerDirtyConfirmDialogClose(): void {
    if (this._dialogRef) {
      this._formDialogClose.forEach(item => {
        this._registerDialogClose(item);
      });

      this._formDialogClose.changes
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((e) => {
        e.forEach(item => {
          this._registerDialogClose(item);
        });
      });
    }
  }

  private _registerDirtyConfirmDialogBackdropEscape(): void {
    this._dialogBackdropEscape = this._dialogRef && this._dialogRef.disableClose !== true;

    if (this._dialogRef && !this._dialogRef.disableClose) {
      this._dialogRef.disableClose = true;
      this._dialogRef.backdropClick()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this._formClose();
      });
    }
  }

  private _registerAutocomplete(): void {
    this._registerControl = this.ngForm.form.registerControl.bind(this.ngForm.form);

    this.ngForm.form.registerControl = (name: string, control: AbstractControl) => {

      const el: Element = this._element.nativeElement.querySelector(`input[name='${name}']`);

      if (el) {
        el.setAttribute('name', name + '_' + guid());

        if (!el.getAttribute('autocomplete')) {
          el.setAttribute('autocomplete', 'none');
        }
      }

      return this._registerControl(name, control);
    }
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

    this._submitButtons.changes
    .pipe(
      takeUntil(this._destroy$),
    )
    .subscribe(() => {
      this._updateDirtySubmitButtons();
    });
  }

  private _updateDirtySubmitButtons(): void {
    if (this._submitButtons) {
      this._submitButtons.forEach((button) => {
      if (!this.dirtyConfirm || !this.dirtySubmitButton || this.ngForm.dirty || !button.dirtySubmit) {
          button.enable();
        } else {
          button.disable();
        }
      });
      this._cdRef.markForCheck();
    }
  }

  private _broadcastSubmittingEvents(): void {
    this._status$.next(FormStatus.Submitting);
    this._form.broadcast('submit', this.ngForm);
  }

  private _markControlsAsTouchedAndUpdateValidity(): void {
    Object.values(this.ngForm.controls).forEach(control => {
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }

  private _setupActiveSubmitButton(): void {
    this._activeSubmitButton = this._getActiveButton();
    this._resetButtons();

    if (this._activeSubmitButton) {
      this._activeSubmitButton.process();
    }
  }

  private _waitUntilStatusPending(): Observable<string> {
    return this.ngForm.statusChanges
      .pipe(
        startWith(this.ngForm.status),
        first((state) => state !== 'PENDING'),
      );
  }

  private _handleError(e: SubmittedEvent) {
    console.log('%c Form Submit ',  'color: white; background-color: #D33F49',  'Error occured');

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

}
