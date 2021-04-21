import { Directive, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormRequired],[ngModel][required]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormRequiredDirective extends FsControlDirective {

  public required = false;

  @Input('fsFormRequired')
  public set setFsFormRequired(value) {
    this._setRequired(value);
  }

  @Input('required')
  public set setRequired(value) {
    this._setRequired(value);
  }

  @Input('fsFormRequiredMessage')
  public set validationMessage(value: string) {
    this._validateMessages.required = value;
  }

  private _setRequired(value) {
    this.required = this.isEnabled(value);

    if (this.required) {
      this.addValidator(Validators.required);
    } else {
      this.removeValidator(Validators.required);
    }
  }

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
