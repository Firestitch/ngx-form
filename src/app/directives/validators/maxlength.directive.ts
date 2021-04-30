import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';


@Directive({
  selector: '[fsFormMaxLength]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormMaxLengthDirective extends FsControlDirective implements FsValidator {

  @Input()
  public fsFormMaxLength: number;

  @Input('fsFormMaxLengthMessage')
  public set validationMessage(value: string) {
    this._validateMessages.maxlength = value;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return Validators.maxLength(this.fsFormMaxLength)(this._control);
  }

}
