import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';
import { isEnabled } from '../../helpers/is-enabled';


@Directive({
  selector: '[fsFormUrl]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormUrlDirective extends FsControlDirective implements OnChanges, FsValidator {

  @Input()
  public fsFormUrl;

  @Input()
  public fsFormUrlProtocol = false;

  @Input('fsFormUrlMessage')
  public set validationMessage(value: string) {
    this._validateMessages.url = value;
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (isEnabled(this.fsFormUrl)) {
      return FsValidators.url(this._control, this.fsFormUrlProtocol);
    } else {
      return null;
    }
  }

}
