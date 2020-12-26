import {
  Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy,
  OnInit, Output, Inject, Optional, QueryList, ContentChildren, AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges,
} from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatTabGroup, MatTab, MatTabHeader } from '@angular/material/tabs';

import { FsMessage, MessageMode } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common';
import { DrawerRef } from '@firestitch/drawer';

import { isObservable, Subject, of, Observable, fromEvent, BehaviorSubject } from 'rxjs';
import { takeUntil, delay, first, take, filter } from 'rxjs/operators';

import { confirmUnsaved } from '../../helpers/confirm-unsaved';
import { FsFormDialogCloseDirective } from '../../directives/form-dialog-close.directive';
import { FsSubmitButtonDirective } from './../../directives/submit-button.directive';
import { ConfigService } from './../../services/config.service';
import { SubmittedEvent } from './../../interfaces';
import { ConfirmResult } from './../../enums/confirm-result';
import { FsForm } from '../../services/fsform.service';
import { DirtyConfirmConfig } from './../../interfaces';
import { SubmitEvent } from './../../interfaces/submit-event';
import { FormStatus } from './../../enums/form-status';
import { confirmResultContinue } from '../../helpers';

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
  private _snapshot: any = {};
  private _status$ = new BehaviorSubject(FormStatus.Valid);

  constructor(
    private _form: FsForm,
    private _element: ElementRef,
    private _message: FsMessage,
    private _prompt: FsPrompt,
    private _configService: ConfigService,
    private _cdRef: ChangeDetectorRef,
    @Inject(NgForm) public ngForm: NgForm,
    @Optional() @Inject(MatDialogRef) private _dialogRef: MatDialogRef<any>,
    @Optional() @Inject(DrawerRef) private _drawerRef: DrawerRef<any>,
  ) {}

  public ngOnInit() {
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

    fromEvent(window, 'beforeunload')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((event: Event) => {
        if (this.dirtyConfirm && this.dirtyConfirmBrowser && this.ngForm.dirty) {
          event.returnValue = false;
        }
      });

    this._configService.form = this;
    this._registerDirtyConfirmDialogBackdropEscape();

    if (!this.autocomplete) {
      this._registerAutocomplete();
    }

    if (this.ngForm) {

      this.ngForm.ngSubmit
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((ngSubmitEvent: KeyboardEvent) => {

        if (ngSubmitEvent) {
          ngSubmitEvent.preventDefault();
        }

        if (
          this._status$.getValue() === FormStatus.Valid ||
          this._status$.getValue() === FormStatus.Invalid
        ) {

          this._status$.next(FormStatus.Submitting);
          this._form.broadcast('submit', this.ngForm);
          const validations = [];

          (Object as any).values(this.ngForm.controls).forEach(control => {
            control.markAsDirty();
            control.markAsTouched();
          });

          (Object as any).values(this.ngForm.controls).forEach(control => {
            control.updateValueAndValidity();
            if (control.asyncValidator) {
              validations.push((control.asyncValidator(control) as Observable<any>).toPromise());
            }
          });

          new Observable(observer => {

            Promise.all(validations)
              .then(() => {

                this._activeSubmitButton = this._getActiveButton();
                this._resetButtons();

                const submitter = this._activeSubmitButton ? this._activeSubmitButton.name : null;

                if (this._activeSubmitButton) {
                  this._activeSubmitButton.process();
                }

                const submitEvent: SubmitEvent = {
                  ngForm: this.ngForm,
                  submitter: submitter
                };

                const submittedEvent: SubmittedEvent = {
                  ngForm: this.ngForm,
                  submitter: submitter,
                  response: null
                };

                if (this.ngForm.form.status === 'INVALID') {
                  this._form.broadcast('invalid', submitEvent);

                  if (this.invalid) {
                    this.invalid.emit(submitEvent);
                  }
                  const message = 'Changes not saved. Please review errors highlighted in red.';
                  this._message.error(message, { mode: MessageMode.Toast });
                  observer.error();

                } else {
                  this._form.broadcast('valid', submitEvent);
                  this.submitEvent.emit(submitEvent);
                  this.valid.emit(submitEvent);

                  if (this.submit) {
                    const result = this.submit(submitEvent);

                    if (isObservable(result)) {

                      result
                        .pipe(
                          takeUntil(this._destroy$)
                        )
                        .subscribe((response) => {
                          submittedEvent.response = response;
                          observer.next(submittedEvent);
                          observer.complete();

                        }, () => {
                          observer.error();
                        });

                    } else {
                      observer.next(submittedEvent);
                      observer.complete();
                    }

                  } else {
                    observer.next(submittedEvent);
                    observer.complete();
                  }
                }

              }).catch(e => {
                observer.error();
              });

          })
            .subscribe((submittedEvent: SubmittedEvent) => {
              this._completeSubmit(true, submittedEvent);
            }, () => {
              this._completeSubmit(false, null);
            });
        }
      });
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.dirtyConfirm) {
      this._updateDirtySubmitButtons();
    }

  }

  public get submitting(): boolean {
    return this._status$.getValue() === FormStatus.Submitting;
  }

  public get completing(): boolean {
    return this._status$.getValue() === FormStatus.Completing;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngAfterContentInit(): void {
    this._registerDirtyConfirm();
    this._registerDirtyConfirmDialogClose();
    this._registerDirtyConfirmDrawerClose();
    this._registerDirtyConfirmTabs();
    this._registerDirtySubmitButton();
    this._registerDrawerClose();
  }

  public createSnapshot(): void {
    this._snapshot = {};
    Object.keys(this.ngForm.controls)
      .forEach((name: string) => {
        const control = this.ngForm.controls[name];
        this._snapshot[name] = control.value;
      });
  }

  public reset(): void {
    this.ngForm.reset();
    this.ngForm.resetForm();
    Object.keys(this.ngForm.controls)
      .forEach((name: string) => {
        const control = this.ngForm.controls[name];
        control.reset(this._snapshot[name]);
        control.markAsUntouched();
        control.markAsPristine();
        control.setErrors(null);
      });
  }

  public clear(): void {
    this.ngForm.reset();
    this.ngForm.resetForm();
    Object.keys(this.ngForm.controls)
      .forEach((name: string) => {
        const control = this.ngForm.controls[name];
        control.reset(undefined);
        control.markAsUntouched();
        control.markAsPristine();
        control.setErrors(null);
      });
  }

  public dirty(): void {
    this.ngForm.form.markAsDirty();
    this._updateDirtySubmitButtons();
  }

  public confirm(): Observable<ConfirmResult> {
    return new Observable(observer => {
      const submitted = this.submitting ? this.submitted.asObservable() : of({});
      submitted
      .pipe(
        take(1),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        confirmUnsaved(this, this._prompt)
        .subscribe((value) => {
          observer.next(value);
          observer.complete();
        }, () => {
          observer.error();
        });
      });
    });
  }

  public disable(): void {
    Object.keys(this.ngForm.controls).forEach((name) => {
      this.ngForm.controls[name].disable();
    });

    this._submitButtons.forEach((button) => {
      button.disable();
    });
  }

  public enable(): void {
    Object.keys(this.ngForm.controls).forEach((name) => {
      this.ngForm.controls[name].enable();
    });

   this._updateDirtySubmitButtons();
  }

  private _formClose(value = null): void {
    if (this.dirtyConfirm && this.dirtyConfirmDialog) {
      this.confirm()
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
        takeUntil(this._destroy$),
        filter(() => (this.dirtyConfirm && this.dirtyConfirmDrawer)),
      )
      .subscribe((subscriber) => {
        this.confirm()
        .subscribe((result) => {
          if (confirmResultContinue(result)) {
            subscriber.next();
          } else {
            subscriber.error();
          }
          subscriber.complete();
        });
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
    .subscribe(this._updateDirtySubmitButtons.bind(this));

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

}
