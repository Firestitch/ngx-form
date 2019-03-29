import { Directive, Input, AfterViewInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { isNumeric } from '@firestitch/common';

@Directive({
  selector: '[fsFormNumeric]'
})
export class FsFormNumericDirective extends FsControlDirective implements AfterViewInit {
  @Input() fsFormNumeric;

  ngAfterViewInit() {
    if (this.isEnabled(this.fsFormNumeric)) {
      this.addValidator((control: AbstractControl): { [key: string]: boolean } => {
        if (isNumeric(control.value)) {
            return null;
        } else {
            return { numeric: true }
        }
      });
    }
  }
}
