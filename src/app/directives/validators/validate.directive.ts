import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable, of } from 'rxjs';

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
export class FsFormValidateDirective extends FsControlDirective implements OnChanges, FsAsyncValidator {

  @Input('validate')
  public validateFn;

  @Input('validateData')
  public validateFnData;

  @Input()
  public validateOnSubmit = false;

  public ngOnChanges(): void {
    this._control.updateValueAndValidity();
  }

  public validateAsync(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if(this.validateOnSubmit && !this.formDirective.validating) {
      return of(null);
    }

    return FsValidators.func(this._control, this.validateFn, this.validateFnData);
  }

}
