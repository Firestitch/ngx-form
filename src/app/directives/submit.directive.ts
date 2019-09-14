import { HostBinding, Directive, Optional } from '@angular/core';
import { FsFormDirective } from './form.directive';


@Directive({
  selector: '[fsFormSubmit]',
})
export class FsFormSubmitDirective {

  constructor(@Optional() private _parentForm: FsFormDirective) {
    if (this._parentForm) {
      this._parentForm.addSubmitButton(this);
    } else {
      console.warn('FsForm Submit Directive was not able to be registered with FsForm')
    }
  }

  @HostBinding('disabled')
  public disabled = false;

  public enable() {
    this.disabled = false;
  }

  public disable() {
    this.disabled = true;
  }
}
