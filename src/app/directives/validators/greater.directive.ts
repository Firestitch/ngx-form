import { Directive, Input, AfterViewInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormGreater]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormGreaterDirective extends FsControlDirective implements AfterViewInit {

  @Input()
  public fsFormGreater;

  @Input('fsFormGreaterMessage')
  public set validationMessage(value: string) {
    this._validateMessages.greater = value;
  }

  public ngAfterViewInit() {
    this.addValidator(() => {
      const greater = parseFloat(this.fsFormGreater);
      const value = parseFloat(this._control.value);
      return !isNaN(greater) && !isNaN(value) && value <= greater ? { greater: `Value must be greater than ${greater}` } : null;
    });

    this.addValidator(FsValidators.numeric);
  }
}
