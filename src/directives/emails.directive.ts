import { Directive, Input, OnChanges } from '@angular/core';
import { Validators } from '@angular/forms';

import { FsControlDirective } from './fscontrol.directive';


@Directive({
  selector: '[fsFormEmails]'
})
export class FsFormEmailsDirective extends FsControlDirective implements OnChanges {

  @Input() public fsFormEmails;

  ngOnChanges() {

      const validator = () => {
        return new Promise((resolve, reject) => {
            const model = this.ngControl.control.value || '';

            for (const value of model.split(',')) {
              if (!this.fsFormCommon.email(value)) {
                resolve({ emails: true });
              }
            };

            resolve(null);
        });
      };

      if (this.isEnabled(this.fsFormEmails)) {
        super.addAsyncValidator(validator);
      } else {
        super.removeAsyncValidator(validator);
      }
  }
}
