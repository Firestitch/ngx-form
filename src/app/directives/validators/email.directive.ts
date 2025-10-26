import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';
import { isEnabled } from '../../helpers/is-enabled';


@Directive({
    selector: '[fsFormEmail]',
    providers: [
        VALIDATE_MESSAGE_PROVIDER
    ],
    standalone: true,
})
export class FsFormEmailDirective extends FsControlDirective implements OnChanges, FsValidator {

  @Input()
  public fsFormEmail;

  @Input('fsFormEmailMessage')
  public set validationMessage(value: string) {
    this._validateMessages.email = value;
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (isEnabled(this.fsFormEmail)) {
      return FsValidators.email(this._control);
    } else {
      return null;
    }
  }
}
