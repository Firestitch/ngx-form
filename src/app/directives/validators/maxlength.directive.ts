import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FsControlDirective } from './control.directive';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormMaxLength]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormMaxLengthDirective extends FsControlDirective implements AfterViewInit {

  @Input() fsFormMaxLength: number;

  @Input('fsFormMaxLengthMessage')
  public set validationMessage(value: string) {
    this._validateMessages.maxlength = value;
  }

  public ngAfterViewInit() {
    this.addValidator(Validators.maxLength(this.fsFormMaxLength));
  }
}
