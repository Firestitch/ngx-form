import { Directive, Input, AfterViewInit, OnChanges } from '@angular/core';
import { isObject } from 'lodash-es';

import { FsControlDirective } from './control.directive';
import { isValid } from 'date-fns';


@Directive({
  selector: '[fsFormDateRange]'
})
export class FsFormDateRangeDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormDateRange;

  private dateRangeValidator = (control) => {

    if (!control.value) {
        return null;
    }

    if (isObject(control.value)) {

        const start = control.value.start;
        const end = control.value.end;

        if ((!start && !end) || (isValid(start) && isValid(end))) {
            return null;
        }
      }

      return { dateRange: true };
  }

  ngOnChanges() {

    if (this.isEnabled(this.fsFormDateRange)) {
      this.addValidator(this.dateRangeValidator);
    } else {
      this.removeValidator(this.dateRangeValidator);
    }
  }
}
