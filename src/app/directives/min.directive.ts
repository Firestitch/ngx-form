import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { validatorNumeric } from '../validators/numeric';

@Directive({
  selector: '[fsFormMin]'
})
export class FsFormMinDirective extends FsControlDirective implements AfterViewInit {
  @Input() fsFormMin: number;

  ngAfterViewInit() {
    this.addValidator(validatorNumeric);
    this.addValidator(Validators.min(this.fsFormMin));
  }
}
