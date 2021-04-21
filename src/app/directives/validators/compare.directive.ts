import { Directive, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';


@Directive({
  selector: '[fsFormCompare]',
  providers: [
    VALIDATE_MESSAGE_PROVIDER
  ],
})
export class FsFormCompareDirective extends FsControlDirective implements AfterViewInit, OnDestroy {

  @Input()
  public fsFormCompare;

  @Input('fsFormCompareMessage')
  public set validationMessage(value: string) {
    this._validateMessages.compare = value;
  }

  public ngAfterViewInit() {
    super.addValidator(this.validator);

    this.fsFormCompare.addEventListener('keyup', () => {
      this.ngControl.control.updateValueAndValidity();
    }, false);
  }

  public ngOnDestroy() {
    this.fsFormCompare.removeEventListener('keyup', () => {
      this.ngControl.control.updateValueAndValidity();
    }, false);
  }

  private validator = () => {
    if (this.fsFormCompare.value === this.elementRef.nativeElement.value) {
      return null;
    } else {
      return { compare: true };
    }
  };
}
