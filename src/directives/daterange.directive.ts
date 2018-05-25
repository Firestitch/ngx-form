import { Directive, Input, OnChanges } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';
import { isObject } from 'lodash';
import * as moment from 'moment-timezone';


@Directive({
  selector: '[fsFormDateRange]'
})
export class FsFormDateRangeDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormDateRange;

  ngOnChanges() {

      const validator = (formControl) => {

        if (isObject(formControl.value)) {
                const start = formControl.value.start;
                const end = formControl.value.end;
                
                if(moment.isMoment(start) && moment.isMoment(end) && start.isValid()  && end.isValid()) {
                    return null;
                }           
            }
            return { dateRange: true };
        }

      if (this.fsFormDateRange) {
          super.addValidator(validator);
      } else {
          super.removeValidator(validator);
      }
  }

}
