import { Directive, Input, OnChanges, OnInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../validators/validators';


@Directive({
  selector: '[fsFormNumeric]'
})
export class FsFormNumericDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input() fsFormNumeric;

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormNumeric)) {
        return FsValidators.numeric(this._control);
      } else {
        return false;
      }
    });
  }
}
