import { Directive, OnInit, Input, Output, EventEmitter, ContentChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { FsForm } from './../services/fsform.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Rx';

@Directive({
    selector: '[fsForm]'
})
export class FsFormDirective implements OnInit, OnDestroy {

  public submitting = false;
  @ContentChild(NgForm) ngForm;
  @Output('fsForm') submit: EventEmitter<any> = new EventEmitter();
  @Output() invalid: EventEmitter<any> = new EventEmitter();

  constructor(private fsForm: FsForm) {}

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

        for (const key in this.ngForm.controls) {

          const control = this.ngForm.controls[key];
          if (control) {
            control.markAsDirty();
            control.markAsTouched();
          }
        }

        for (const key in this.ngForm.controls) {

          const control = this.ngForm.controls[key];

          if (control) {

            control.updateValueAndValidity();

            if (control.asyncValidator) {
              validations.push(control.asyncValidator().toPromise());
            }
          }
        }

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
