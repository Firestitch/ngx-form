import { Directive, Input, OnChanges, OnInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormDateRange]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormDateRangeDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input()
  public fsFormDateRange;

  @Input('fsFormDateRangeMessage')
  public set validationMessage(value: string) {
    this._validateMessages.dateRange = value;
  }

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormDateRange)) {
        this.addValidator(FsValidators.dateRange);
      } else {
        this.removeValidator(FsValidators.dateRange);
      }
    });
  }
}
