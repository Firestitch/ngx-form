import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable } from 'rxjs';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsAsyncValidator } from '../../interfaces/async-validator';


@Directive({
  selector: '[validate]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormValidateDirective extends FsControlDirective implements FsAsyncValidator {
  @Input()
  public validate;

  @Input()
  public validateData;

  public validateAsync(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return FsValidators.func(this._control, this.validate, this.validateData);
  }

}
