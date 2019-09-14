import {
  OnInit, Output, EventEmitter, ContentChild, Input,
  Component, ViewEncapsulation, HostBinding, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { values } from 'lodash-es';
import { FsForm } from '../services/fsform.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FsFormSubmitDirective } from './submit.directive';


@Component({
  selector: '[fsForm]',
  template: `<ng-content></ng-content>`,
  styles: [`.fs-form-label-required:after { content: " *"; display: contents }
            .fs-form .ng-invalid.ng-dirty .fs-form-label { color: #f44336 }
            .fs-form .fs-form-error { color: #f44336 }
            .fs-form .fs-form-message { margin-top: 0.54166667em }
            .fs-form .mat-placeholder-required { display: none }`],
  encapsulation: ViewEncapsulation.None
})
export class FsFormDirective implements OnInit, OnDestroy {

  @ContentChild(NgForm) ngForm;
  @Input() wrapperSelector = '.fs-form-wrapper,.mat-form-field';
  @Input() messageSelector = '.fs-form-message,.mat-form-field-subscript-wrapper';
  @Input() hintSelector = '.fs-form-hint,.mat-form-field-hint-wrapper';
  @Input() labelSelector = '.fs-form-label,.mat-form-field-label';
  @Output('fsForm') submit: EventEmitter<any> = new EventEmitter();
  @Output() invalid: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.fs-form') fsformClass = true;

  public submitting = false;

  private _submitBtn: FsFormSubmitDirective;
  private destroy$ = new Subject();

  constructor(private fsForm: FsForm) {}

  get submitButton() {
    return this._submitBtn;
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

  addSubmitButton(btn: FsFormSubmitDirective) {
    this._submitBtn = btn;
  }
}
