import { Directive, Input, OnChanges } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { validatorNumeric } from '../validators/numeric';


@Directive({
  selector: '[fsFormNumeric]'
})
export class FsFormNumericDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormNumeric;

  ngOnChanges() {
    if (this.isEnabled(this.fsFormNumeric)) {
      this.addValidator(validatorNumeric);
    } else {
      this.removeValidator(validatorNumeric);
    }
  }
}
