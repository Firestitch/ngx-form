import { Directive, Input, AfterViewInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[validate]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormValidateDirective extends FsControlDirective implements AfterViewInit {
  @Input()
  public validate;

  @Input()
  public validateData;

  public ngAfterViewInit() {
    this.addAsyncValidator(() => {
      return FsValidators.func(this._control, this.validate, this.validateData);
    });
  }
}
