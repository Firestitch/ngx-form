import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormMax]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormMaxDirective extends FsControlDirective implements AfterViewInit {

  @Input()
  public fsFormMax: number;

  @Input('fsFormMaxMessage')
  public set validationMessage(value: string) {
    debugger;
    this._validateMessages.max = value;
  }

  public ngAfterViewInit() {
    this.addValidator(FsValidators.numeric);
    this.addValidator(Validators.max(this.fsFormMax));
  }
}
