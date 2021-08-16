import { Directive, Input, OnChanges } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';
import { isEnabled } from '../../helpers/is-enabled';


@Directive({
  selector: '[fsFormRequired],[ngModel][required]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormRequiredDirective extends FsControlDirective implements OnChanges {
  public required = false;

  @Input('fsFormRequired')
  public set setFsFormRequired(value) {
    this.required = isEnabled(value);
  }

  @Input('required')
  public set setRequired(value) {
    this.required = isEnabled(value);
  }

  @Input('fsFormRequiredMessage')
  public set validationMessage(value: string) {
    this._validateMessages.required = value;
  }

  public ngOnChanges(): void {
    this._control.updateValueAndValidity();
  }

  // We don't actually need to add our custom required validator,
  // because it has been already done by 100% similar angular validator with same selector
  // public validate(control: AbstractControl): ValidationErrors | null {
  //   if (this.required) {
  //     return Validators.required(this._control);
  //   } else {
  //     return null;
  //   }
  // }

  protected render() {

    const wrapper = this.getWrapperElement();

    if (wrapper && this.getlabelSelector()) {
      const labelWrapper = wrapper.querySelector(this.getlabelSelector());

      // Adding class fs-form-label-requried adds the * to the label
      if (labelWrapper) {
        if (this.required) {
          this.renderer2.addClass(labelWrapper, 'fs-form-label-required');
        } else {
          this.renderer2.removeClass(labelWrapper, 'fs-form-label-required');
        }
      }
    }

    super.render();
  }
}
