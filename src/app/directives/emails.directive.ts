import { Directive, Input, OnChanges } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { email } from '@firestitch/common';


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
              if (!email(value)) {
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
