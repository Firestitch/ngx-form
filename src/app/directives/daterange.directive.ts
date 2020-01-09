import { Directive, Input, OnChanges, OnInit } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../validators/validators';

@Directive({
  selector: '[fsFormDateRange]'
})
export class FsFormDateRangeDirective extends FsControlDirective implements OnInit, OnChanges {

  @Input() fsFormDateRange;

  public ngOnInit() {
    this._addValidator();
  }

  public ngOnChanges() {
    this._control.updateValueAndValidity();
  }

  private _addValidator() {
    this.addValidator(() => {
      if (this.isEnabled(this.fsFormDateRange)) {
        this.addValidator(FsValidators.dateRange);
      } else {
        this.removeValidator(FsValidators.dateRange);
      }
    });
  }
}
