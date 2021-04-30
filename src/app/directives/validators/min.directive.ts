import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';


@Directive({
  selector: '[fsFormMin]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormMinDirective extends FsControlDirective implements FsValidator {

  @Input()
  public fsFormMin;

  @Input('fsFormMinMessage')
  public set validationMessage(value: string) {
    this._validateMessages.min = value;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return FsValidators.numeric(this._control) || Validators.min(parseFloat(this.fsFormMin))(this._control);
  }

}
