import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { isEnabled } from '../../helpers/is-enabled';
import { FsValidator } from '../../interfaces/validator';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidators } from '../../validators/validators';

import { FsControlDirective } from './control.directive';


@Directive({
    selector: '[fsFormUrl]',
    providers: [
        VALIDATE_MESSAGE_PROVIDER,
    ],
    standalone: true,
})
export class FsFormUrlDirective extends FsControlDirective implements OnChanges, FsValidator {

  @Input()
  public fsFormUrl;

  @Input()
  public fsFormUrlProtocol = true;

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
    }
 
    return null;
    
  }

}
