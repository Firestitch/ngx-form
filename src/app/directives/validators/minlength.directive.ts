import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormMinLength]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormMinLengthDirective extends FsControlDirective implements AfterViewInit {

  @Input()
  public fsFormMinLength: number;

  @Input('fsFormMinLengthMessage')
  public set validationMessage(value: string) {
    this._validateMessages.minlength = value;
  }

  public ngAfterViewInit() {
    this.addValidator(Validators.minLength(this.fsFormMinLength));
  }
}
