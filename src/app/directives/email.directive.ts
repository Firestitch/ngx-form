import { Directive, Input, AfterViewInit, forwardRef } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { AbstractControl } from '@angular/forms';
import { email } from '@firestitch/common';


@Directive({
  selector: '[fsFormEmail]'
})
export class FsFormEmailDirective extends FsControlDirective implements AfterViewInit {
  @Input() fsFormEmail;

  ngAfterViewInit() {

    this.addValidator((control: AbstractControl) => {
      if (!this.isEnabled(this.fsFormEmail) || !control.value || email(control.value)) {
        return null;
      }

      return { email: true };
    });
  }
}
