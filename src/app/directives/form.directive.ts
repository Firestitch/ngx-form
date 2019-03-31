import { Directive, OnInit, Output, EventEmitter, ContentChild,
         Input, ContentChildren, QueryList, IterableDiffers } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OnDestroy, AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { values } from 'lodash-es';
import { FsForm } from '../services/fsform.service';
import { FsFormCommon } from '../services/fsformcommon.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FsFormEmailDirective } from '../directives/email.directive';
import { FsFormCompareDirective } from '../directives/compare.directive';
import { FsFormDateRangeDirective } from '../directives/daterange.directive';
import { FsFormEmailsDirective } from '../directives/emails.directive';
import { FsFormFunctionDirective } from '../directives/function.directive';
import { FsFormIntegerDirective } from '../directives/integer.directive';
import { FsFormMaxDirective } from './max.directive';
import { FsFormMaxLengthDirective } from './maxlength.directive';
import { FsFormMinDirective } from './min.directive';
import { FsFormMinLengthDirective } from './minlength.directive';
import { FsFormNumericDirective } from '../directives/numeric.directive';
import { FsFormPatternDirective } from '../directives/pattern.directive';
import { FsFormPhoneDirective } from '../directives/phone.directive';
import { FsFormRequiredDirective } from './required.directive';


@Directive({
  selector: '[fsForm]'
})
export class FsFormDirective implements OnInit, OnDestroy, AfterContentInit {

  @ContentChild(NgForm) ngForm;
  @Input() fieldWrapperClass = 'mat-form-field';
  @Input() messageWrapperClass = 'mat-form-field-subscript-wrapper';
  @Input() hintWrapperClass = 'mat-form-field-hint-wrapper';

  @ContentChildren(FsFormCompareDirective, { descendants: true })
  compareQueryList: QueryList<FsFormCompareDirective>;

  @ContentChildren(FsFormDateRangeDirective, { descendants: true })
  dateRangeQueryList: QueryList<FsFormDateRangeDirective>;

  @ContentChildren(FsFormEmailsDirective, { descendants: true })
  emailsQueryList: QueryList<FsFormEmailsDirective>;

  @ContentChildren(FsFormEmailDirective, { descendants: true })
  emailQueryList: QueryList<FsFormEmailDirective>;

  @ContentChildren(FsFormFunctionDirective, { descendants: true })
  functionQueryList: QueryList<FsFormFunctionDirective>;

  @ContentChildren(FsFormIntegerDirective, { descendants: true })
  integerQueryList: QueryList<FsFormIntegerDirective>;

  @ContentChildren(FsFormMaxDirective, { descendants: true })
  maxQueryList: QueryList<FsFormMaxDirective>;

  @ContentChildren(FsFormMaxLengthDirective, { descendants: true })
  maxLengthQueryList: QueryList<FsFormMaxLengthDirective>;

  @ContentChildren(FsFormMinDirective, { descendants: true })
  minQueryList: QueryList<FsFormMinDirective>;

  @ContentChildren(FsFormMinLengthDirective, { descendants: true })
  minLengthQueryList: QueryList<FsFormMinLengthDirective>;

  @ContentChildren(FsFormNumericDirective, { descendants: true })
  numericQueryList: QueryList<FsFormNumericDirective>;

  @ContentChildren(FsFormPatternDirective, { descendants: true })
  patternQueryList: QueryList<FsFormPatternDirective>;

  @ContentChildren(FsFormPhoneDirective, { descendants: true })
  phoneQueryList: QueryList<FsFormPhoneDirective>;

  @ContentChildren(FsFormRequiredDirective, { descendants: true })
  requiredQueryList: QueryList<FsFormRequiredDirective>;

  @Output('fsForm') submit: EventEmitter<any> = new EventEmitter();
  @Output() invalid: EventEmitter<any> = new EventEmitter();

  public submitting = false;
  private destroy$ = new Subject();

  constructor(private fsForm: FsForm) {}

  private registerQueryList(queryList) {

    queryList.forEach(directive => {
      directive.formDirective = this;
    });

    queryList.changes
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(items => {
        queryList.forEach(directive => {
          directive.formDirective = this;
        });
      });
  }

  ngAfterContentInit() {
    this.registerQueryList(this.compareQueryList);
    this.registerQueryList(this.dateRangeQueryList);
    this.registerQueryList(this.emailQueryList);
    this.registerQueryList(this.emailsQueryList);
    this.registerQueryList(this.functionQueryList);
    this.registerQueryList(this.integerQueryList);
    this.registerQueryList(this.maxQueryList);
    this.registerQueryList(this.maxLengthQueryList);
    this.registerQueryList(this.minQueryList);
    this.registerQueryList(this.minLengthQueryList);
    this.registerQueryList(this.numericQueryList);
    this.registerQueryList(this.patternQueryList);
    this.registerQueryList(this.phoneQueryList);
    this.registerQueryList(this.requiredQueryList);
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
