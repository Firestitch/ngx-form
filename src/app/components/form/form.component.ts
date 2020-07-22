import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Inject,
  Optional,
  QueryList,
  ContentChildren,
  AfterContentInit,
  ChangeDetectorRef
} from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatTabGroup, MatTab, MatTabHeader } from '@angular/material/tabs';

import { FsMessage, MessageMode } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common';
import { DrawerRef } from '@firestitch/drawer';

import { isObservable, Subject, of, Observable } from 'rxjs';
import { takeUntil, delay, first } from 'rxjs/operators';

import { forOwn } from 'lodash-es';

import { confirmUnsaved } from '../../helpers/confirm-unsaved';
import { FsFormDialogCloseDirective } from '../../directives/form-dialog-close.directive';
import { FsSubmitButtonDirective } from './../../directives/submit-button.directive';
import { ConfigService } from './../../services/config.service';
import { SubmittedEvent, SubmitEvent } from './../../interfaces';
import { ConfirmResult } from './../../enums/confirm-result';
import { FsForm } from '../../services/fsform.service';
import { confirmResultContinue } from '../../helpers';

@Component({
  selector: '[fsForm]',
  template: `<ng-content></ng-content>`,
  providers: [ ConfigService ]
})
export class FsFormComponent implements OnInit, OnDestroy, AfterContentInit {

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
  @Input() dirtyConfirm = true;
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

  @HostListener('window:keydown.esc', ['$event'])
  windowKeyUp(event: any) {

    if (this._dialogBackdropEscape) {
      const dialog = document.getElementById(this._dialogRef.id);

      event.path.forEach(item => {
        if (dialog === item) {
          this._formClose();
        }
      });
    }
  }

  @HostListener('window:keydown', ['$event'])
  windowKeyDown(event: any) {

    if ((event.ctrlKey || event.metaKey) && event.code === 'KeyS') {
      event.preventDefault();

      if (this.shortcuts) {
        if (this._elementInForm(document.activeElement)) {
          this.ngForm.ngSubmit.next();
        }
      }
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  windowBeforeUnload(event: Event) {
    if (this.dirtyConfirm && this.dirtyConfirmBrowser && this.ngForm.dirty) {
      event.returnValue = false;
    }
  }

  public submitting = false;

  private _destroy$ = new Subject();
  private _registerControl;
  private _activeSubmitButton: FsSubmitButtonDirective;
  private _dialogBackdropEscape = false;
  private _snapshot: any = {};

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

        if (this.submitting) {
          return false;
        }

        this.submitting = true;
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

            const progressEl = new DOMParser().parseFromString(this._getProgressSvg(), 'text/xml').firstChild;
            const submitter = this._activeSubmitButton ? this._activeSubmitButton.name : null;

            if (this._activeSubmitButton) {
              this._activeSubmitButton.element.append(progressEl);
              this._activeSubmitButton.element.classList.add('submit-process');
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
                  .subscribe(response => {
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
        .subscribe((event: SubmittedEvent) => {
          this._completeSubmit('submit-success', this._getSuccessSvg());
          this.ngForm.control.markAsPristine();
          this._updateDirtySubmitButtons();
          this.submitted.emit(event);
          this._snapshot = {};

          forOwn(this.ngForm.controls, (control: AbstractControl, name) => {
            this._snapshot[name] = control.value;
          });
        }, () => {
          this._completeSubmit('submit-error', this._getErrorSvg());
        });
      });
    }
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

  public confirm(): Observable<ConfirmResult> {
    return new Observable(observer => {
      const submitted = this.submitting ? this.submitted.asObservable() : of({});
      submitted
      .pipe(
        first()
      )
      .subscribe(() => {
        confirmUnsaved(this, this._prompt)
        .subscribe(value => {
          observer.next(value);
          observer.complete();
        }, () => {
          observer.error();
        });
      });
    });
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

  private _completeSubmit(cls, svg) {

    if (this._activeSubmitButton) {
      this._resetButtons();
      const el = new DOMParser().parseFromString(svg, 'text/xml').firstChild;
      this._activeSubmitButton.element.classList.add(cls);
      this._activeSubmitButton.element.append(el);
    }

    of(true)
    .pipe(
      takeUntil(this._destroy$),
      delay(1500),
      first()
    ).subscribe(() => {
      this.submitting = false;
      this._resetButtons();
    });
  }

  private _resetButtons() {
    this._submitButtons.forEach(button => {
      button.active = false;
      const el = button.element.querySelector('.svg-icon');
      if (el) {
        button.element.removeChild(el);
      }

      button.element.classList.remove('submit-success');
      button.element.classList.remove('submit-error');
      button.element.classList.remove('submit-process');
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
      this._submitButtons.forEach(item => {
        if (this.ngForm.dirty) {
          item.enable();
        } else {
          item.disable();
        }
      });
    }
  }

  private _getProgressSvg() {
    return '<svg class="svg-icon svg-icon-progress" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur=".7s" repeatCount="indefinite"/></path></g></g></svg>';
  }

  private _getSuccessSvg() {
    return '<svg class="svg-icon svg-icon-success" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512px" height="512px"><g><g><g><path d="M437.019,74.98C388.667,26.629,324.38,0,256,0C187.619,0,123.331,26.629,74.98,74.98C26.628,123.332,0,187.62,0,256 s26.628,132.667,74.98,181.019C123.332,485.371,187.619,512,256,512c68.38,0,132.667-26.629,181.019-74.981 C485.371,388.667,512,324.38,512,256S485.371,123.333,437.019,74.98z M256,482C131.383,482,30,380.617,30,256S131.383,30,256,30 s226,101.383,226,226S380.617,482,256,482z" data-original="#000000" data-old_color="#000000" fill="#FFFFFF"/></g></g><g><g><path d="M378.305,173.859c-5.857-5.856-15.355-5.856-21.212,0.001L224.634,306.319l-69.727-69.727 c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.857-5.858,15.355,0,21.213l80.333,80.333c2.929,2.929,6.768,4.393,10.606,4.393 c3.838,0,7.678-1.465,10.606-4.393l143.066-143.066C384.163,189.215,384.163,179.717,378.305,173.859z" data-original="#000000" data-old_color="#000000" fill="#FFFFFF"/></g></g></g> </svg>';
  }

  private _getErrorSvg() {
    return '<svg class="svg-icon svg-icon-error" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="512px" height="512px" viewBox="0 0 16 16"><g><path fill="#FFFFFF" d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z" data-original="#444444" data-old_color="#444444"/><path fill="#FFFFFF" d="M12.2 10.8l-2.8-2.8 2.8-2.8-1.4-1.4-2.8 2.8-2.8-2.8-1.4 1.4 2.8 2.8-2.8 2.8 1.4 1.4 2.8-2.8 2.8 2.8z" data-original="#444444" data-old_color="#444444"/></g> </svg>';
  }
}
