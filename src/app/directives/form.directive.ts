import { Directive, OnInit, Output, EventEmitter, ContentChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { values } from 'lodash-es';
import { FsForm } from '../services/fsform.service';
import { FsFormCommon } from '../services/fsformcommon.service';


@Directive({
  selector: '[fsForm]',
  providers: [ FsFormCommon ]
})
export class FsFormDirective implements OnInit, OnDestroy {

  @ContentChild(NgForm) ngForm;
  @Input() fieldWrapperClass = 'mat-form-field';
  @Input() messageWrapperClass = 'mat-form-field-subscript-wrapper';
  @Input() hintWrapperClass = 'mat-form-field-hint-wrapper';

  @Output('fsForm') submit: EventEmitter<any> = new EventEmitter();
  @Output() invalid: EventEmitter<any> = new EventEmitter();

  public submitting = false;

  constructor(private fsForm: FsForm,
              private fsFormCommon: FsFormCommon) {
    fsFormCommon.fsFormDirective = this;
  }

  ngOnInit() {

    if (this.ngForm) {
      this.ngForm.ngSubmit.subscribe(event => {

        if (event) {
          event.preventDefault();
        }

        if (this.submitting) {
          return false;
        }

        this.submitting = true;
        this.fsForm.broadcast('submit', this.ngForm);
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
            this.submitting = false;
            if (this.ngForm.form.status === 'INVALID') {

              this.fsForm.broadcast('invalid', this.ngForm);

              if (this.invalid) {
                this.invalid.emit(this.ngForm);
              }

            } else {
              this.fsForm.broadcast('valid', this.ngForm);

              if (this.submit) {
                this.submit.emit(this.ngForm);
              }
            }
        }).catch((e) => {
          this.submitting = false;
        });
      });
    }
  }

  ngOnDestroy() {
    this.ngForm.ngSubmit.unsubscribe();
  }
}
