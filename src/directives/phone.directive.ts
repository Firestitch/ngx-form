import { Directive, Input, OnChanges } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormPhone]'
})
export class FsFormPhoneDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormPhone;

  ngOnChanges() {

      const validator = () => {
          if (this.fsFormCommon.phone(this.elRef.nativeElement.value)) {
              return null;
          }
          return { phone: true };
      };

      if (this.fsFormPhone) {
          super.addValidator(validator);
      }else {
          super.removeValidator(validator);
      }
  }
}
