import { Directive, OnChanges } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


/**
 * This directive required for cases when we have custom Control like <fs-phone-field> but without any of our validators applied
 *
 * This directive required for automatic validation messages
 */
@Directive({
  selector: '[ngModel]' +
    ':not([required])' +
    ':not([fsFormRequired])' +
    ':not([fsFormCompare])' +
    ':not([fsFormDateRange])' +
    ':not([fsFormEmail])' +
    ':not([fsFormEmails])' +
    ':not([fsFormFunction])' +
    ':not([fsFormGreater])' +
    ':not([fsFormInteger])' +
    ':not([fsFormLesser])' +
    ':not([fsFormMax])' +
    ':not([fsFormMaxLength])' +
    ':not([fsFormMin])' +
    ':not([fsFormMinLength])' +
    ':not([fsFormNumeric])' +
    ':not([fsFormPattern])' +
    ':not([fsFormPhone])' +
    ':not([fsFormUrl])' +
    ':not([validate])',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormNoFsValidatorsDirective extends FsControlDirective implements OnChanges {

  public ngOnChanges(): void {
    this._control.updateValueAndValidity();
  }

  protected _subscribeToStatusChagnes(): void {
    if (!!this._control.validator || !!this._control.asyncValidator) {
      super._subscribeToStatusChagnes();
    }
  }

}
