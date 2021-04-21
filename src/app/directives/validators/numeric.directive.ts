import { Directive, Input, OnChanges, OnInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormNumeric]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormNumericDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input()
  public fsFormNumeric;

  @Input('fsFormNumericMessage')
  public set validationMessage(value: string) {
    this._validateMessages.numeric = value;
  }

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormNumeric)) {
        return FsValidators.numeric(this._control);
      } else {
        return false;
      }
    });
  }
}
