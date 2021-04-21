import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';

@Directive({
  selector: '[fsFormMin]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormMinDirective extends FsControlDirective implements AfterViewInit {

  @Input()
  public fsFormMin;

  @Input('fsFormMinMessage')
  public set validationMessage(value: string) {
    this._validateMessages.min = value;
  }

  public ngAfterViewInit() {
    this.addValidator(FsValidators.numeric);
    this.addValidator(Validators.min(parseFloat(this.fsFormMin)));
  }
}
