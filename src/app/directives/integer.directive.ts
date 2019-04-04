import { Directive, Input, AfterViewInit, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FsControlDirective } from './control.directive';


@Directive({
  selector: '[fsFormInteger]'
})
export class FsFormIntegerDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormInteger;

  private integerValidator = (control: AbstractControl): { [key: string]: boolean } => {

    if (!control.value || this.isInteger(control.value)) {
        return null;
    } else {
        return { integer: true }
    }
  }

  ngOnChanges() {
    if (this.isEnabled(this.fsFormInteger)) {
      this.addValidator(this.integerValidator);
    } else {
      this.removeValidator(this.integerValidator);
    }
  }

  isInteger(value) {
    return String(value) === '' || (value % 1 === 0);
  }
}
