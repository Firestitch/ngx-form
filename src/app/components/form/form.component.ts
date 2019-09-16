import { OnInit, Output, EventEmitter, ContentChild, Input,
         Component, ViewEncapsulation, HostBinding, OnDestroy, ElementRef } from '@angular/core';
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
  @Output() invalid: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.fs-form') fsformClass = true;

  public submitting = false;
  private _destroy$ = new Subject();

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

        Promise.all(validations)
        .then(() => {

            if (this.ngForm.form.status === 'INVALID') {

              this._form.broadcast('invalid', this.ngForm);

              if (this.invalid) {
                this.invalid.emit(this.ngForm);
              }

              this.submitting = false;

            } else {

              this._form.broadcast('valid', this.ngForm);
              this.submitEvent.emit(this.ngForm);

              if (this.submit) {
                const result = this.submit(this.ngForm);

                if (isObservable(result)) {

                  const activeElement = document.activeElement;

                  const buttons = this._element.nativeElement.querySelectorAll('button[type="submit"]')
                  buttons.forEach(button => {
                    if (activeElement === button || !activeElement) {
                      button.classList.add('submitting');
                    }
                  });

                  const completeSubmit = () => {
                    this.submitting = false;
                    buttons.forEach(button => {
                      button.classList.remove('submitting');
                    });
                  }

                  result
                  .pipe(
                    takeUntil(this._destroy$)
                  )
                  .subscribe(completeSubmit, completeSubmit);

                } else {
                  this.submitting = false;
                }

              } else {
                this.submitting = false;
              }
            }

        }).catch(e => {
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
