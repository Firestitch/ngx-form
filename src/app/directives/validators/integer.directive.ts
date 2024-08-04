import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { isEnabled } from '../../helpers/is-enabled';
import { FsValidator } from '../../interfaces/validator';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidators } from '../../validators/validators';

import { FsControlDirective } from './control.directive';


@Directive({
  selector: '[fsFormInteger]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER,
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
    }
 
    return null;
    
  }

}
