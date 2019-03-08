import { Directive, Input, OnChanges } from '@angular/core';
import { isObject } from 'lodash-es';

import { FsControlDirective } from './fscontrol.directive';
import { isValid } from 'date-fns';


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

            if ((!start && !end) || (isValid(start) && isValid(end))) {
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
