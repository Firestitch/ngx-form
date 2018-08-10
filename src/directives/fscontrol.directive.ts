import { Directive, OnChanges, Input, AfterViewChecked,
         ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FsFormCommon } from './../services/fsformcommon.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
 selector: '[fsControl]'
})
export class FsControlDirective implements AfterViewChecked, OnDestroy {

  @Input() fsFormRequiredMessage = 'This field is required.';
  @Input() fsFormEmailMessage = 'This is not a valid email address.';
  @Input() fsFormEmailsMessage = 'Input valid email addresses, comma separated.';
  @Input() fsFormPhoneMessage = 'Invalid phone number.';
  @Input() fsFormNumericMessage = 'Value should be numeric.';
  @Input() fsFormIntegerMessage = 'Value should be an integer.';
  @Input() fsFormMinMessage = 'Value should not be less than $(1).';
  @Input() fsFormMaxMessage = 'Value should not be bigger than $(1).';
  @Input() fsFormMinlengthMessage = 'Should not be shorter than $(1) characters.';
  @Input() fsFormMaxlengthMessage = 'Should not be longer than $(1) characters.';
  @Input() fsFormCompareMessage = 'Inputs do not match.';
  @Input() fsFormPatternMessage = 'Value should match pattern $(1)';
  @Input() fsFormDateRangeMessage = 'Invalid date range.';
  @Input() fsFormErrorsOrder = [];

  protected statusChanges$;

  constructor(
      protected elementRef: ElementRef,
      protected renderer2: Renderer2,
      protected ngControl: NgControl,
      protected fsFormCommon: FsFormCommon) {

      this.statusChanges$ = this.ngControl.control.statusChanges.subscribe(res => {
          fsFormCommon.renderErrors(this, this.ngControl, this.renderer2, elementRef);
      });

      this.ngControl.control['fsValidators'] = this.ngControl.control['fsValidators'] || [];
      this.ngControl.control['fsAsyncValidators'] = this.ngControl.control['fsAsyncValidators'] || [];
  }

  ngOnDestroy() {
      this.statusChanges$.unsubscribe();
  }

  // If the inputs are not visible (display: none) then don't include the input in the validation
  ngAfterViewChecked() {

      const element = this.elementRef;
      // If not visible
      if ( element.nativeElement.offsetParent === null) {
          this.ngControl.control.clearValidators();
          this.ngControl.control.clearAsyncValidators();
      } else {
          // Hack. If element visible, has no validatio but exist some validation rules -
          // updating validators and triggering change event (For some reason inputs assign
          // new rules only oinit and on change events
          if (
              (this.ngControl.control['fsValidators'].length && !this.ngControl.control.validator) ||
              (this.ngControl.control['fsAsyncValidators'].length && !this.ngControl.control.asyncValidator)
          ) {

              this.updateValidators();
              setTimeout(() => {
                  this.ngControl.control.setValue(this.ngControl.control.value);
              });
          }
      }
  }

  updateValidators() {
      this.ngControl.control.setValidators(this.ngControl.control['fsValidators']);
      this.ngControl.control.setAsyncValidators(this.ngControl.control['fsAsyncValidators']);
      this.ngControl.control.updateValueAndValidity();
  }

  addValidator(validator) {
      this.ngControl.control['fsValidators'].push(validator);
      this.updateValidators();
  }

  removeValidator(validator) {
      const index = this.fsFormCommon.searchIndex(this.ngControl.control['fsValidators'], validator);

      if (index !== -1) {
          this.ngControl.control['fsValidators'].splice(index, 1);
          this.updateValidators();
      }
  }

  addAsyncValidator(validator) {
      this.ngControl.control['fsAsyncValidators'].push(validator);
      this.ngControl.control.setAsyncValidators(this.ngControl.control['fsAsyncValidators']);
  }

  removeAsyncValidator(validator) {
    const index = this.fsFormCommon.searchIndex(this.ngControl.control['fsAsyncValidators'], validator);

    if (index !== -1) {
        this.ngControl.control['fsAsyncValidators'].splice(index, 1);
        this.updateValidators();
    }
}

  isEnabled(value) {
    return value || value === '';
  }
}
