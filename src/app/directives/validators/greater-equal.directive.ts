import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';


@Directive({
  selector: '[fsFormGreaterEqual]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormGreaterEqualDirective extends FsControlDirective implements OnChanges, FsValidator {

  @Input()
  public fsFormGreaterEqual;

  @Input('fsFormGreaterEqualMessage')
  public set validationMessage(value: string) {
    this._validateMessages.greater = value;
  }

  public ngOnChanges(): void {
    this._control.updateValueAndValidity();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const greater = parseFloat(this.fsFormGreaterEqual);
    const value = parseFloat(this._control.value);

    if (!isNaN(greater) && !isNaN(value) && value < greater) {
      return { greaterEqual: { greater, actual: value } };
    }

    return FsValidators.numeric(this._control);
  }

}
