import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';
import { isEnabled } from '../../helpers/is-enabled';


@Directive({
    selector: '[fsFormPhone]',
    providers: [
        VALIDATE_MESSAGE_PROVIDER
    ],
    standalone: true,
})
export class FsFormPhoneDirective extends FsControlDirective implements OnChanges, FsValidator {

  @Input()
  public fsFormPhone;

  @Input('fsFormPhoneMessage')
  public set validationMessage(value: string) {
    this._validateMessages.phone = value;
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (isEnabled(this.fsFormPhone)) {
      return FsValidators.phone(this._control);
    } else {
      return null;
    }
  }

}
