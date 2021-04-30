import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';


@Directive({
  selector: '[fsFormMax]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormMaxDirective extends FsControlDirective implements FsValidator {

  @Input()
  public fsFormMax: number;

  @Input('fsFormMaxMessage')
  public set validationMessage(value: string) {
    this._validateMessages.max = value;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return FsValidators.numeric(this._control) || Validators.max(this.fsFormMax)(this._control);
  }

}
