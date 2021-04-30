import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';


@Directive({
  selector: '[fsFormGreater]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormGreaterDirective extends FsControlDirective implements FsValidator {

  @Input()
  public fsFormGreater;

  @Input('fsFormGreaterMessage')
  public set validationMessage(value: string) {
    this._validateMessages.greater = value;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const greater = parseFloat(this.fsFormGreater);
    const value = parseFloat(this._control.value);

    if (!isNaN(greater) && !isNaN(value) && value <= greater) {
      return { greater: { greater, actual: value } };
    }

    return FsValidators.numeric(this._control);
  }

}
