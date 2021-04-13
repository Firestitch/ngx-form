import { Directive, Input, AfterViewInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';


@Directive({
  selector: '[fsFormGreater]'
})
export class FsFormGreaterDirective extends FsControlDirective implements AfterViewInit {

  @Input() fsFormGreater;

  public ngAfterViewInit() {
    this.addValidator(() => {
      const greater = parseFloat(this.fsFormGreater);
      const value = parseFloat(this._control.value);
      return !isNaN(greater) && !isNaN(value) && value <= greater ? { greater: `Value must be greater than ${greater}` } : null;
    });

    this.addValidator(FsValidators.numeric);
  }
}
