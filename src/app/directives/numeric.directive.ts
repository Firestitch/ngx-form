import { Directive, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormNumeric]'
})
export class FsFormNumericDirective extends FsControlDirective implements OnInit {
  @Input() fsFormNumeric;

  ngOnInit() {
    if (this.isEnabled(this.fsFormNumeric)) {
      super.addValidator((control: AbstractControl): { [key: string]: boolean } => {
        if (this.fsFormCommon.isNumeric(control.value)) {
            return null;
        } else {
            return { numeric: true }
        }
      });
    }
  }
}
