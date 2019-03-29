import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { validatorNumeric } from '../validators/numeric';


@Directive({
  selector: '[fsFormMax]'
})
export class FsFormMaxDirective extends FsControlDirective implements AfterViewInit {
  @Input() public fsFormMax: number;

  ngAfterViewInit() {
    this.addValidator(validatorNumeric);
    this.addValidator(Validators.max(this.fsFormMax));
  }
}
