import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { FsValidator } from '../../interfaces/validator';


@Directive({
  selector: '[fsFormPattern]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormPatternDirective extends FsControlDirective implements FsValidator {

  @Input()
  public fsFormPattern: RegExp;

  @Input('fsFormPatternMessage')
  public set validationMessage(value: string) {
    this._validateMessages.pattern = value;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return Validators.pattern(this.fsFormPattern)(this._control);
  }

}
