import { Directive, Input, OnChanges } from '@angular/core';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormPhone]'
})
export class FsFormPhoneDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormPhone;

  ngOnChanges() {

      const validator = () => {
        if (this.fsFormCommon.phone(this.elementRef.nativeElement.value)) {
            return null;
        }
        return { phone: true };
      };

      if (this.isEnabled(this.fsFormPhone)) {
          super.addValidator(validator);
      }else {
          super.removeValidator(validator);
      }
  }
}