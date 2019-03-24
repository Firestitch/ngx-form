import { Directive, Input, OnChanges, OnInit } from '@angular/core';
import { isObject } from 'lodash-es';

import { FsControlDirective } from './fscontrol.directive';
import { isValid } from 'date-fns';


@Directive({
  selector: '[fsFormDateRange]'
})
export class FsFormDateRangeDirective extends FsControlDirective implements OnInit {
  @Input() fsFormDateRange;

  ngOnInit() {

    super.addValidator((control) => {

      if (!this.isEnabled(this.fsFormDateRange)) {
        return null;
      }

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
    });
  }
}
