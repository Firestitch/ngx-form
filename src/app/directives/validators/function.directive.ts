import { Directive, Input, AfterViewInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormFunction]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormFunctionDirective extends FsControlDirective implements AfterViewInit {
  @Input()
  public fsFormFunction;

  @Input()
  public fsFormFunctionData;

  public ngAfterViewInit() {
    this.addAsyncValidator(() => {
      return FsValidators.func(this._control, this.fsFormFunction, this.fsFormFunctionData);
    });
  }
}
