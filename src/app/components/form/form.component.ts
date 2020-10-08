import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Inject,
  Optional,
  QueryList,
  ContentChildren,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatTabGroup, MatTab, MatTabHeader } from '@angular/material/tabs';

import { FsMessage, MessageMode } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common';
import { DrawerRef } from '@firestitch/drawer';

import { isObservable, Subject, of, Observable, fromEvent, BehaviorSubject } from 'rxjs';
import { takeUntil, delay, first, take } from 'rxjs/operators';

import { forOwn } from 'lodash-es';

import { confirmUnsaved } from '../../helpers/confirm-unsaved';
import { FsFormDialogCloseDirective } from '../../directives/form-dialog-close.directive';
import { FsSubmitButtonDirective } from './../../directives/submit-button.directive';
import { ConfigService } from './../../services/config.service';
import { SubmittedEvent } from './../../interfaces';
import { ConfirmResult } from './../../enums/confirm-result';
import { FsForm } from '../../services/fsform.service';
import { DirtyConfirmConfig } from './../../interfaces';
import { SubmitEvent } from './../../interfaces/submit-event';
import { confirmResultContinue } from '../../helpers';

@Component({
  selector: '[fsForm]',
  template: `<ng-content></ng-content>`,
  providers: [ConfigService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsFormComponent implements OnInit, OnDestroy, AfterContentInit {

  static StatusIdling = 'idling';
  static StatusSubmitting = 'submitting';
  static StatusCompleting = 'completing';

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
  private _status$ = new BehaviorSubject(FsFormComponent.StatusIdling);

  constructor(
    private _form: FsForm,
    private _element: ElementRef,
    private _message: FsMessage,
    private _prompt: FsPrompt,
    private _configService: ConfigService,
    private _cdRef: ChangeDetectorRef,
    @Inject(NgForm) public ngForm: NgForm,
    @Optional() @Inject(MatDialogRef) private _dialogRef: MatDialogRef<any>,
    @Optional() @Inject(DrawerRef) private _drawerRef: DrawerRef<any>) {}

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
    if (this.dirtyConfirm && this.dirtyConfirmDialog) {
      this._registerDirtyConfirmDialogBackdropEscape();
    }

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
          this._status$.getValue() !== FsFormComponent.StatusIdling
        ) {
          return false;
        }

        this._status$.next(FsFormComponent.StatusSubmitting);
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
      });
    }
  }

  public get submitting(): boolean {
    return this._status$.getValue() === FsFormComponent.StatusSubmitting;
  }

  public get completing(): boolean {
    return this._status$.getValue() === FsFormComponent.StatusCompleting;
  }

  public get idling(): boolean {
    return this._status$.getValue() === FsFormComponent.StatusIdling;
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngAfterContentInit() {

    if (this.dirtyConfirm) {
      this._registerDirtyConfirm();
    }

    if (this.dirtyConfirm && this.dirtyConfirmDialog) {
      this._registerDirtyConfirmDialogClose();
    }

    if (this.dirtyConfirm && this.dirtyConfirmDrawer) {
      this._registerDirtyConfirmDrawerClose();
    }

    if (this.dirtySubmitButton) {
      this._registerDirtySubmitButton();
    }

    if (this.dirtyConfirm && this.dirtyConfirmTabs) {
      this._registerDirtyConfirmTabs();
    }
  }

  public reset() {
    this.ngForm.reset();
    this.ngForm.resetForm();
    forOwn(this.ngForm.controls, (control: AbstractControl, name) => {
      control.reset(this._snapshot[name]);
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

  public disable() {
    Object.keys(this.ngForm.controls).forEach((name) => {
      this.ngForm.controls[name].disable();
    });

    this._submitButtons.forEach((button) => {
      button.disable();
    });
  }

  public enable() {
    Object.keys(this.ngForm.controls).forEach((name) => {
      this.ngForm.controls[name].enable();
    });

    if (this.dirtySubmitButton) {
      this._updateDirtySubmitButtons();
    } else {
      this._submitButtons.forEach((button) => {
        button.enable();
      });
    }
  }

  private _formClose(value = null): void {
    this.confirm()
    .subscribe((result) => {
      if (confirmResultContinue(result)) {
        this._dialogRef.close(value);
      }
    });
  }

  private _registerClose(directive: FsFormDialogCloseDirective) {

    if (!directive.registered) {
      directive.registered = true;
      directive.clicked$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this._formClose(null);
      });
    }
  }

  private _getActiveButton() {
    const activeButton = this._submitButtons.find(button => {
      return button.active;
    });

    return activeButton ? activeButton : this._submitButtons.first;
  }

  private _elementInForm(el: Element) {

    if (el.isSameNode(this._element.nativeElement)) {
      return true;
    } else if (el.parentElement) {
      return this._elementInForm(el.parentElement);
    }

    return false;
  }

  private _completeSubmit(success, submitEvent: SubmitEvent) {
    if (this._activeSubmitButton) {
      this._resetButtons();
      if (success) {
        this._activeSubmitButton.success();
        this.ngForm.control.markAsPristine();
        this.submitted.emit(submitEvent);
        this._snapshot = {};
        forOwn(this.ngForm.controls, (control: AbstractControl, name) => {
          this._snapshot[name] = control.value;
        });
      } else {
        this._activeSubmitButton.error();
      }
    }

    this._status$.next(FsFormComponent.StatusCompleting);

    of(true)
    .pipe(
      takeUntil(this._destroy$),
      delay(1500),
      first()
    ).subscribe(() => {
      this._status$.next(FsFormComponent.StatusIdling);
      this._resetButtons();
      this._updateDirtySubmitButtons();
    });
  }

  private _resetButtons() {
    this._submitButtons.forEach((button) => {
      button.reset();
    });
  }

  private _registerDirtyConfirm() {
    this.ngForm.form.valueChanges
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe((changes) => {
      const existing = Object.keys(this._snapshot);
      forOwn(changes, (value, name) => {
        if (existing.indexOf(name) < 0) {
          this._snapshot[name] = value;
        }
      });
    });
  }

  private _registerDirtyConfirmDrawerClose() {

    if (this._drawerRef) {
      this._drawerRef.closeStart$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(subscriber => {
        this.confirm()
        .subscribe(result => {
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

  private _registerDirtyConfirmTabs() {

    this._registerDirtyConfirmTabGroups();

    this._tabGroups.changes
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(changes => {
      this._registerDirtyConfirmTabGroups();
    });
  }

  private _registerDirtyConfirmTabGroups() {
    this._tabGroups.forEach((tabGroup: any) => {
      if (!tabGroup._dirtyHandleClick) {
        tabGroup._dirtyHandleClick = tabGroup._handleClick;
        tabGroup._handleClick = (tab: MatTab, tabHeader: MatTabHeader, idx: number) => {

          if (!this.submitting) {
            this.confirm()
            .subscribe((result) => {
              if (confirmResultContinue(result)) {
                tabGroup.selectedIndex = idx;
              }
            });
          }
        }
      }
    });
  }

  private _registerDirtyConfirmDialogClose() {
    if (this._dialogRef) {
      this._formDialogClose.forEach(item => {
        this._registerClose(item);
      });

      this._formDialogClose.changes
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((e) => {
        e.forEach(item => {
          this._registerClose(item);
        });
      });
    }
  }

  private _registerDirtyConfirmDialogBackdropEscape() {
    this._dialogBackdropEscape = this._dialogRef && this._dialogRef.disableClose !== true;

    if (this._dialogRef) {
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

  private _registerAutocomplete() {
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

  private _registerDirtySubmitButton() {

    if (!this.ngForm) {
      return;
    }

    this.ngForm.form.valueChanges
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(this._updateDirtySubmitButtons.bind(this));

    this._submitButtons.changes
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(() => {
      this._updateDirtySubmitButtons();
    });
  }

  private _updateDirtySubmitButtons() {
    if (this.dirtySubmitButton) {
      this._submitButtons.forEach((button) => {
        if (this.ngForm.dirty || !button.dirtySubmit) {
          button.enable();
        } else {
          button.disable();
        }
      });
      this._cdRef.markForCheck();
    }
  }

}
