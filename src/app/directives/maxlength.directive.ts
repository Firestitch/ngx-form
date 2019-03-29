import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';

@Directive({
  selector: '[fsFormMaxLength]'
})
export class FsFormMaxLengthDirective extends FsControlDirective implements AfterViewInit {
  @Input() fsFormMaxLength: number;

  ngAfterViewInit() {
    this.addValidator(Validators.maxLength(this.fsFormMaxLength));
  }
}
