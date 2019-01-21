import { Directive, Input, OnChanges } from '@angular/core';
import { isObject } from 'lodash-es';
import * as _moment from 'moment-timezone';
const moment = _moment;

import { FsControlDirective } from './fscontrol.directive';


@Directive({
  selector: '[fsFormDateRange]'
})
export class FsFormDateRangeDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormDateRange;

  ngOnChanges() {

      const validator = (formControl) => {

        if (!formControl.value) {
            return null;
        }

        if (isObject(formControl.value)) {

            const start = formControl.value.start;
            const end = formControl.value.end;

            if ((!start && !end) ||
                (moment.isMoment(start) && moment.isMoment(end) && start.isValid()  && end.isValid())) {
                return null;
            }
          }

          return { dateRange: true };
        }

      if (this.isEnabled(this.fsFormDateRange)) {
          super.addValidator(validator);
      } else {
          super.removeValidator(validator);
      }
  }

}
