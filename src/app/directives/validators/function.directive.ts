import { Directive, Input, AfterViewInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';


@Directive({
  selector: '[fsFormFunction]',
})
export class FsFormFunctionDirective extends FsControlDirective implements AfterViewInit {
  @Input() fsFormFunction;
  @Input() fsFormFunctionData;

  public ngAfterViewInit() {
    this.addAsyncValidator(() => {
      return FsValidators.func(this._control, this.fsFormFunction, this.fsFormFunctionData);
    });
  }
}
