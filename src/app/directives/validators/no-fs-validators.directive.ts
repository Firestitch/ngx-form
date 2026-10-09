import { Directive, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

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
        ':not([fsFormGreaterEqual])' +
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
    standalone: true,
})
export class FsFormNoFsValidatorsDirective extends FsControlDirective implements OnChanges {

  public ngOnChanges(): void {
    this._control.updateValueAndValidity();
  }

  /**
   * A control with no validators has no message to show, so it is not bound (SP-T2996). Asked
   * after NgForm has registered the control, because a custom control's own NG_VALIDATORS
   * (fsDatePickerBirthday, fs-password…) only reach it then. Checked earlier, in
   * ngAfterContentInit, they were never there yet, so those messages never showed (IEB-T254).
   */
  protected _shouldBind(control: AbstractControl): boolean {
    return !!control.validator || !!control.asyncValidator;
  }

}
