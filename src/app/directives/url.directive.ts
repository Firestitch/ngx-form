import { Directive, Input, OnChanges, OnInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../validators/validators';

@Directive({
  selector: '[fsFormUrl]'
})
export class FsFormUrlDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input() public fsFormUrl;

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormUrl)) {
        return FsValidators.url(this._control);
      } else {
        return false;
      }
    });
  }
}
