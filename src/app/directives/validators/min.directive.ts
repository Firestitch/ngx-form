import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';

@Directive({
  selector: '[fsFormMin]'
})
export class FsFormMinDirective extends FsControlDirective implements AfterViewInit {

  @Input() fsFormMin;

  public ngAfterViewInit() {
    this.addValidator(FsValidators.numeric);
    this.addValidator(Validators.min(parseFloat(this.fsFormMin)));
  }
}
