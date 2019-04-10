import { Directive, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';

@Directive({
  selector: '[fsFormRequired],[required]'
})
export class FsFormRequiredDirective extends FsControlDirective {

  public required = false;

  @Input('fsFormRequired') set setFsFormRequired(value) {
    this._setRequired(value);
  }

  @Input('required') set setRequired(value) {
    this._setRequired(value);
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

    const wrapper = this.getFieldWrapperElement();

    const labelWrapper = wrapper.querySelector(this.getlabelSelectors().join(','));

    if (labelWrapper) {
      if (this.required) {
        this.renderer2.addClass(labelWrapper, 'fs-form-label-required');
      } else {
        this.renderer2.removeClass(labelWrapper, 'fs-form-label-required');
      }
    }

    super.render();
  }
}
