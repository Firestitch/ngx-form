import { Directive, Input, OnChanges, OnInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormEmails]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormEmailsDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input()
  public fsFormEmails;

  @Input('fsFormEmailsMessage')
  public set validationMessage(value: string) {
    this._validateMessages.emails = value;
  }

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormEmails)) {
        return FsValidators.emails(this._control);
      } else {
        return false;
      }
    });
  }
}
