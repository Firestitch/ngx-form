import { Input, ElementRef, Renderer2, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { OnDestroy, AfterContentInit } from '@angular/core';
import { FsFormCommon } from './../services/fsformcommon.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { values, keys, capitalize, remove } from 'lodash-es';


@Directive({
  selector: '[fsFormControl]'
})
export class FsControlDirective implements AfterContentInit, OnDestroy {

  @Input() fieldWrapperClass = '';
  @Input() messageWrapperClass = '';
  @Input() hintWrapperClass = '';
  @Input() fsFormRequiredMessage = 'This field is required';
  @Input() fsFormEmailMessage = 'This is not a valid email address';
  @Input() fsFormEmailsMessage = 'Input valid email addresses, comma separated';
  @Input() fsFormPhoneMessage = 'Invalid phone number';
  @Input() fsFormNumericMessage = 'Value should be numeric';
  @Input() fsFormIntegerMessage = 'Value should be an integer';
  @Input() fsFormMinMessage = 'Value should not be less than $(1)';
  @Input() fsFormMaxMessage = 'Value should not be greater than $(1)';
  @Input() fsFormMinlengthMessage = 'Should not be shorter than $(1) characters';
  @Input() fsFormMaxlengthMessage = 'Should not be longer than $(1) characters';
  @Input() fsFormCompareMessage = 'Inputs do not match';
  @Input() fsFormPatternMessage = 'Value should match pattern $(1)';
  @Input() fsFormDateRangeMessage = 'Invalid date range';

  protected destroy$ = new Subject();
  public errors = [];

  constructor(
      protected elementRef: ElementRef,
      protected renderer2: Renderer2,
      protected ngControl: NgControl,
      protected fsFormCommon: FsFormCommon) {
        (<any>this.ngControl.control).fsValidators = (<any>this.ngControl.control).fsValidators || [];
        (<any>this.ngControl.control).fsAsyncValidators = (<any>this.ngControl.control).asyncValidators || [];
      }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // If the inputs are not visible (display: none) then don't include the input in the validation
  ngAfterContentInit() {

    this.ngControl.control.statusChanges
    .pipe(
        takeUntil(this.destroy$)
    )
    .subscribe(res => {
      this.renderErrors();
    });

    const element = this.elementRef;

    // If not visible
    if ( element.nativeElement.offsetParent === null) {
      this.ngControl.control.clearValidators();
      this.ngControl.control.clearAsyncValidators();

    } else {

      // Hack. If element visible, has no validation but exist some validation rules -
      // updating validators and triggering change event (For some reason inputs assign
      // new rules only oinit and on change events
      // if (
      //     (this.ngControl.control['fsValidators'].length && !this.ngControl.control.validator) ||
      //     (this.ngControl.control['fsAsyncValidators'].length && !this.ngControl.control.asyncValidator)
      // ) {

        this.updateValidators();
        setTimeout(() => {
            this.ngControl.control.setValue(this.ngControl.control.value);
        });
      //}
    }
  }

  getMessageWrapperClasses() {

    const cls = ['.fs-form-message-wrapper'];

    if (this.messageWrapperClass) {
      cls.push(`.${this.messageWrapperClass}`);

    } else if ( this.fsFormCommon &&
                this.fsFormCommon.fsFormDirective &&
                this.fsFormCommon.fsFormDirective.messageWrapperClass) {
      cls.push(`.${this.fsFormCommon.fsFormDirective.messageWrapperClass}`);
    }

    return cls;
  }

  getHintWrapperClasses() {

    const cls = ['.fs-form-hint-wrapper'];

    if (this.hintWrapperClass) {
      cls.push(`.${this.hintWrapperClass}`);

    } else if ( this.fsFormCommon &&
                this.fsFormCommon.fsFormDirective &&
                this.fsFormCommon.fsFormDirective.hintWrapperClass) {
      cls.push(`.${this.fsFormCommon.fsFormDirective.hintWrapperClass}`);
    }

    return cls;
  }

  getFieldWrapperClass() {

    if (this.fieldWrapperClass) {
      return this.fieldWrapperClass;
    }

    if (this.fsFormCommon && this.fsFormCommon.fsFormDirective) {
      return this.fsFormCommon.fsFormDirective.fieldWrapperClass;
    }

    return '';
  }


  /*
    <mat-form-field class="mat-form-field">  <-- Field Wrapper. Look for parents from the native element with the matching fieldWrapperClass. If not found defaults to native element.
      <input>
      <div class="fs-form-message-wrapper"> <-- Message Wrapper. Look for the element with class .fs-form-message-wrapper or messageWrapperClass
        <div class="fs-form-message-wrapper"></div>
        <div class="fs-form-hint-wrapper"></div> <-- Hint Wrapper. Look for the element with class .fs-form-hint-wrapper or hintWrapperClass
      </div>
    </mat-form-field>
  */

  renderErrors() {

    const renderer = this.renderer2;

    if (this.ngControl.dirty) {

      const error = this.getError(this, this.ngControl);

      let wrapper = this.getFieldWrapper(this.elementRef.nativeElement);

      if (!wrapper) {
        wrapper = this.elementRef.nativeElement;
      }

      const messageWrapper = wrapper.querySelector(this.getMessageWrapperClasses().join(','));

      if (!messageWrapper) {
        return console.warn('Failed to locate fs-form-message-wrapper');
      }

      renderer.addClass(messageWrapper, 'mat-form-field-subscript-wrapper');

      const hint = messageWrapper.querySelector(this.getHintWrapperClasses().join(','));

      if (hint) {
        renderer.setStyle(hint, 'display', error ? 'none' : 'block');
      }

      if (!error) {
        this.clearWrapperErrors(messageWrapper);
      }

      if (!error) {
        return;
      }

      this.clearWrapperErrors(messageWrapper);

      let errorWrapper = messageWrapper.querySelector(`.fs-form-error-wrapper`);

      if (!errorWrapper) {
        errorWrapper = renderer.createElement('div');
        renderer.addClass(errorWrapper, 'fs-form-error-wrapper');
      }

      const errorElement = renderer.createElement('div');
      let errorText: string = null;

      renderer.addClass(errorElement, 'mat-error');
      renderer.addClass(errorElement, 'fs-form-error');
      renderer.addClass(errorElement, 'fs-form-error-' + error.name);

      errorText = renderer.createText(error.message);

      renderer.appendChild(errorElement, errorText);
      renderer.appendChild(errorWrapper, errorElement);
      messageWrapper.appendChild(errorWrapper);
    }
  }

  private getFieldWrapper(node, count = 0) {

    if (count > 10) {
      return null;
    }

    if (node.classList.contains(this.getFieldWrapperClass())) {
      return node;
    }

    return this.getFieldWrapper(node.parentNode, ++count);
  }

  private clearWrapperErrors(wrapper) {
    const errorWrapper = wrapper.querySelector('.fs-form-error-wrapper');
    if (errorWrapper) {
      errorWrapper.remove();
    }
  }

  private parseErrorMessage(message, args): string {

    values(args).forEach(name => {
        message = message.replace(/\$\(\d\)/, name);
    });

    return message;
  }

  private getError(instance, controlRef): { name: string, message: string } {

    const name = keys(controlRef.control.errors)[0];

    if (!name) {
      return null;
    }

    let message = controlRef.control.errors[name];

    const variable = `fsForm${capitalize(name)}Message`;

    if (instance[variable]) {
      message = this.parseErrorMessage(instance[variable], message);
    }

    return { name: name, message: message };
  }

  public addValidator(validator) {

    // To avoid error: ExpressionChangedAfterItHasBeenCheckedError
    // Expression has changed after it was checked. Previous value: 'ng-valid: true'. Current value: 'ng-valid: false'.
    setTimeout(() => {
      this.getValidators().push(validator);
        this.updateValidators();
      });
  }

  public addAsyncValidator(validator) {
    setTimeout(() => {
      this.getAsyncValidators().push(validator);
      this.ngControl.control.setAsyncValidators(this.getAsyncValidators());
    });
  }

  private getValidators() {
    return (<any>this.ngControl.control).fsValidators || [];
  }

  private getAsyncValidators() {
    return (<any>this.ngControl.control).fsAsyncValidators || [];
  }

  public removeValidator(validator) {
    remove(this.getValidators(), (item) => {
      return item === validator;
    });
    this.updateValidators();
  }

  public removeAsyncValidator(validator) {
    remove(this.getAsyncValidators(), (item) => {
      return item === validator;
    });
    this.updateValidators();
  }

  public isEnabled(value) {
    return value !== false && value !== 'false';
  }

  private updateValidators() {
    this.ngControl.control.setValidators(this.getValidators());
    this.ngControl.control.setAsyncValidators(this.getAsyncValidators());
    this.ngControl.control.updateValueAndValidity();
  }
}
