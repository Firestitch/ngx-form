import { Directive, Input, AfterViewInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormLesser]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormLesserDirective extends FsControlDirective implements AfterViewInit {

  @Input()
  public fsFormLesser;

  @Input('fsFormLesserMessage')
  public set validationMessage(value: string) {
    this._validateMessages.lesser = value;
  }

  public ngAfterViewInit() {
    this.addValidator(() => {
      const lesser = parseFloat(this.fsFormLesser);
      const value = parseFloat(this._control.value);
      return !isNaN(lesser) && !isNaN(value) && value >= lesser ? { lesser: `Value must be less than ${lesser}` } : null;
    });

    this.addValidator(FsValidators.numeric);
  }
}
