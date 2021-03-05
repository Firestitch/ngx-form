import { Directive, Input, AfterViewInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../validators/validators';


@Directive({
  selector: '[validate]',
})
export class FsFormValidateDirective extends FsControlDirective implements AfterViewInit {
  @Input() validate;
  @Input() validateData;

  public ngAfterViewInit() {
    this.addAsyncValidator(() => {
      return FsValidators.func(this._control, this.validate, this.validateData);
    });
  }
}
