import { Directive, Input, AfterViewInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FsControlDirective } from './control.directive';


@Directive({
  selector: '[fsFormInteger]'
})
export class FsFormIntegerDirective extends FsControlDirective implements AfterViewInit {
  @Input() fsFormInteger;

  ngAfterViewInit() {
    this.addValidator((control: AbstractControl): { [key: string]: boolean } => {

        if (!this.isEnabled(this.fsFormInteger) || !control.value || this.isInteger(control.value)) {
            return null;
        } else {
            return { integer: true }
        }
    });
  }

  isInteger(value) {
    return String(value) === '' || (value % 1 === 0);
  }
}
