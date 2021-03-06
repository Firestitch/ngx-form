import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';
import { isEnabled } from '../../helpers/is-enabled';


@Directive({
  selector: '[fsFormEmails]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormEmailsDirective extends FsControlDirective implements OnChanges, FsValidator {

  @Input()
  public fsFormEmails;

  @Input('fsFormEmailsMessage')
  public set validationMessage(value: string) {
    this._validateMessages.emails = value;
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (isEnabled(this.fsFormEmails)) {
      return FsValidators.emails(this._control);
    } else {
      return null;
    }
  }

}
