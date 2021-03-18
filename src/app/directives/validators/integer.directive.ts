import { Directive, Input, OnChanges, OnInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';


@Directive({
  selector: '[fsFormInteger]'
})
export class FsFormIntegerDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input() fsFormInteger;

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormInteger)) {
        return FsValidators.integer(this._control);
      } else {
        return false;
      }
    });
  }
}
