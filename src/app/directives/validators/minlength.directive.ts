import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';


@Directive({
  selector: '[fsFormMinLength]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormMinLengthDirective extends FsControlDirective implements FsValidator {

  @Input()
  public fsFormMinLength: number;

  @Input('fsFormMinLengthMessage')
  public set validationMessage(value: string) {
    this._validateMessages.minlength = value;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return Validators.minLength(this.fsFormMinLength)(this._control);
  }
}
