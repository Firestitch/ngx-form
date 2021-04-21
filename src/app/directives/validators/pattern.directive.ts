import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormPattern]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormPatternDirective extends FsControlDirective implements AfterViewInit {

  @Input()
  public fsFormPattern: RegExp;

  @Input('fsFormPatternMessage')
  public set validationMessage(value: string) {
    this._validateMessages.pattern = value;
  }

  public ngAfterViewInit() {
    this.addValidator(Validators.pattern(this.fsFormPattern));
  }
}
