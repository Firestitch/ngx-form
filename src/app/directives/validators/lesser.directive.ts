import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';


@Directive({
  selector: '[fsFormLesser]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormLesserDirective extends FsControlDirective implements FsValidator {

  @Input()
  public fsFormLesser;

  @Input('fsFormLesserMessage')
  public set validationMessage(value: string) {
    this._validateMessages.lesser = value;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const lesser = parseFloat(this.fsFormLesser);
    const value = parseFloat(this._control.value);

    if (!isNaN(lesser) && !isNaN(value) && value >= lesser) {
      return { lesser: { lesser, actual: value } };
    }

    return FsValidators.numeric(this._control);
  }

}
