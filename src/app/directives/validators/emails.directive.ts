import { Directive, Input, OnChanges, OnInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { FsValidators } from '../../validators/validators';


@Directive({
  selector: '[fsFormEmails]'
})
export class FsFormEmailsDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input() public fsFormEmails;

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormEmails)) {
        return FsValidators.emails(this._control);
      } else {
        return false;
      }
    });
  }
}
