import { OnInit, Output, EventEmitter, ContentChild, Input,
         Component, ViewEncapsulation, HostBinding, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { values } from 'lodash-es';
import { FsForm } from '../../services/fsform.service';
import { Subject, isObservable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: '[fsForm]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FsFormComponent implements OnInit, OnDestroy {

  @ContentChild(NgForm) ngForm;
  @Input() wrapperSelector = '.fs-form-wrapper,.mat-form-field';
  @Input() messageSelector = '.fs-form-message,.mat-form-field-subscript-wrapper';
  @Input() hintSelector = '.fs-form-hint,.mat-form-field-hint-wrapper';
  @Input() labelSelector = '.fs-form-label,.mat-form-field-label';
  @Input() submit: Function;
  @Output('fsForm') submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() invalid: EventEmitter<any> = new EventEmitter();s
  @HostBinding('class.fs-form') fsformClass = true;

  public submitting = false;

  private _destroy$ = new Subject();
  private _activeButton;

  @HostListener('click', ['$event'])
  public windowClick(event: any): void {
    const path = event.path || event.composedPath();
    path.push(...event.target);
    this._activeButton = null;
    const index = path.indexOf(this._element.nativeElement);
    if (index >= 0) {
      this._activeButton = path.splice(0, index).find(el => {
        return el.nodeName === 'BUTTON' && el.type === 'submit';
      });
    }
  }

  constructor(private _form: FsForm,
              private _element: ElementRef) {}

  ngOnInit() {

    if (this.ngForm) {
      this.ngForm.ngSubmit
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(event => {

        if (event) {
          event.preventDefault();
        }

        if (this.submitting) {
          return false;
        }

        this.submitting = true;
        this._form.broadcast('submit', this.ngForm);
        const validations = [];

        values(this.ngForm.controls).forEach(control => {
          control.markAsDirty();
          control.markAsTouched();
        });

        values(this.ngForm.controls).forEach(control => {
            control.updateValueAndValidity();

            if (control.asyncValidator) {
              validations.push(control.asyncValidator().toPromise());
            }
        });


        const promise = new Promise((resolve, reject) => {

          Promise.all(validations)
          .then(() => {

              if (this.ngForm.form.status === 'INVALID') {

                this._form.broadcast('invalid', this.ngForm);

                if (this.invalid) {
                  this.invalid.emit(this.ngForm);
                }

                reject();

              } else {

                this._form.broadcast('valid', this.ngForm);
                this.submitEvent.emit(this.ngForm);

                if (this.submit) {
                  const result = this.submit(this.ngForm);

                  if (isObservable(result)) {

                    const submitButton: any = Array.from(this._element.nativeElement
                                                            .querySelectorAll('button[type="submit"]'))
                                          .find(button => { return this._activeButton === button });

                    if (submitButton && this.submitting) {
                      submitButton.classList.add('submitting');
                    }

                    const completeSubmit = () => {
                      if (submitButton) {
                        submitButton.classList.remove('submitting');
                      }
                      resolve();
                    }

                    result
                    .pipe(
                      takeUntil(this._destroy$)
                    )
                    .subscribe(completeSubmit, completeSubmit);

                  } else {
                    resolve();
                  }

                } else {
                  resolve();
                }
              }

          }).catch(e => {
            reject();
          });
        });

        promise.then(() => {

          const submittingButton: any =  Array.from(this._element.nativeElement
                                                      .querySelectorAll('button[type="submit"]'))
                                    .find(button => { return this._activeButton === button });
          if (submittingButton) {
            submittingButton.classList.add('submitted');
          }

          setTimeout(() => {
            if (submittingButton) {
              submittingButton.classList.remove('submitted');
            }

            this.submitting = false;
          }, 2000);

        }).catch(() => {
          this.submitting = false;
        });
      });
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
