import { Directive, Input, OnChanges, OnInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormPhone]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormPhoneDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input()
  public fsFormPhone;

  @Input('fsFormPhoneMessage')
  public set validationMessage(value: string) {
    this._validateMessages.phone = value;
  }

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormPhone)) {
        return FsValidators.phone(this._control);
      } else {
        return false;
      }
    });
  }
}
