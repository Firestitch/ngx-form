import { OnInit, Output, EventEmitter, ContentChild, Input, Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { values } from 'lodash-es';
import { FsForm } from '../services/fsform.service';
import { FsFormCommon } from '../services/fsformcommon.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: '[fsForm]',
  template: `<ng-content></ng-content>`,
  styles: [`.fs-form-label-required:after { content: " *"; display: contents }
            .fs-form .ng-invalid.ng-dirty .fs-form-label { color: #f44336 }
            .fs-form .mat-placeholder-required { display: none }`],
  providers: [ FsFormCommon ],
  encapsulation: ViewEncapsulation.None
})
export class FsFormDirective implements OnInit, OnDestroy {

  @ContentChild(NgForm) ngForm;
  @Input() fieldWrapperClass = 'mat-form-field';
  @Input() messageWrapperSelector = '.mat-form-field-subscript-wrapper';
  @Input() hintWrapperSelector = '.mat-form-field-hint-wrapper';
  @Input() labelSelector = '.mat-form-field-label';

  @Output('fsForm') submit: EventEmitter<any> = new EventEmitter();
  @Output() invalid: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.fs-form') fsformClass = true;

  public submitting = false;
  private destroy$ = new Subject();

  constructor(private fsForm: FsForm,
              private fsFormCommon: FsFormCommon) {
    fsFormCommon.fsFormDirective = this;
  }

  ngOnInit() {

    if (this.ngForm) {
      this.ngForm.ngSubmit
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(event => {

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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
