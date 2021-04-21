import { Directive, Input, OnChanges, OnInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormUrl]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormUrlDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input()
  public fsFormUrl;

  @Input('fsFormUrlMessage')
  public set validationMessage(value: string) {
    this._validateMessages.url = value;
  }

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormUrl)) {
        return FsValidators.url(this._control);
      } else {
        return false;
      }
    });
  }
}
