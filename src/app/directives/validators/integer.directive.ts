import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';
import { isEnabled } from '../../helpers/is-enabled';


@Directive({
  selector: '[fsFormInteger]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormIntegerDirective extends FsControlDirective implements OnChanges, FsValidator {

  @Input()
  public fsFormInteger;

  @Input('fsFormIntegerMessage')
  public set validationMessage(value: string) {
    this._validateMessages.integer = value;
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (isEnabled(this.fsFormInteger)) {
      return FsValidators.integer(this._control);
    } else {
      return null;
    }
  }

}
