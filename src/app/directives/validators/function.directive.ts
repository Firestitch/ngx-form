import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { FsAsyncValidator } from '../../interfaces/async-validator';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidators } from '../../validators/validators';

import { FsControlDirective } from './control.directive';


@Directive({
    selector: '[fsFormFunction]',
    providers: [
        VALIDATE_MESSAGE_PROVIDER,
    ],
    standalone: true,
})
export class FsFormFunctionDirective extends FsControlDirective implements OnChanges, FsAsyncValidator {

  @Input()
  public fsFormFunction;

  @Input()
  public fsFormFunctionData;

  @Input()
  public validateOnSubmit = false;

  public ngOnChanges(): void {
    this._control.updateValueAndValidity();
  }

  public validateAsync(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if(this.validateOnSubmit && !this._formDirective.validating) {
      return of(null);
    }
    
    return FsValidators.func(this._control, this.fsFormFunction, this.fsFormFunctionData);
  }

}
