import { Directive, Input, OnChanges, OnInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormEmail]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormEmailDirective extends FsControlDirective implements OnInit, OnChanges {
  @Input()
  public fsFormEmail;

  @Input('fsFormEmailMessage')
  public set validationMessage(value: string) {
    this._validateMessages.email = value;
  }

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormEmail)) {
        return FsValidators.email(this._control);
      } else {
        return false;
      }
    });
  }
}
