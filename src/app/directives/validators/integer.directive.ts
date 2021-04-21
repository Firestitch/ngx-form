import { Directive, Input, OnChanges, OnInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormInteger]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormIntegerDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input()
  public fsFormInteger;

  @Input('fsFormIntegerMessage')
  public set validationMessage(value: string) {
    this._validateMessages.integer = value;
  }

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormInteger)) {
        return FsValidators.integer(this._control);
      } else {
        return false;
      }
    });
  }
}
