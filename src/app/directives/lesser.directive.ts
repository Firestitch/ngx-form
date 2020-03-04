import { Directive, Input, AfterViewInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../validators/validators';

@Directive({
  selector: '[fsFormLesser]'
})
export class FsFormLesserDirective extends FsControlDirective implements AfterViewInit {

  @Input() fsFormLesser;

  public ngAfterViewInit() {
    this.addValidator(() => {
      const lesser = parseFloat(this.fsFormLesser);
      const value = parseFloat(this._control.value);
      return !isNaN(lesser) && !isNaN(value) && value >= lesser ? { lesser: `Value must be less than ${lesser}` } : null;
    });

    this.addValidator(FsValidators.numeric);
  }
}
