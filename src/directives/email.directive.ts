import { Directive, Input, OnChanges } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormEmail]'
})
export class FsFormEmailDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormEmail;

  ngOnChanges() {

      const validator = () => {
          if (!this.elementRef.nativeElement.value || this.fsFormCommon.email(this.elementRef.nativeElement.value)) {
              return null;
          }
          return { email: true };
      };

      if (this.isEnabled(this.fsFormEmail)) {
          super.addValidator(validator);
      } else {
          super.removeValidator(validator);
      }
  }
}
