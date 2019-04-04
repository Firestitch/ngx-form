import { Directive, Input, AfterViewInit, OnChanges } from '@angular/core';
import { FsControlDirective } from './control.directive';
import { AbstractControl } from '@angular/forms';
import { email } from '@firestitch/common';


@Directive({
  selector: '[fsFormEmail]'
})
export class FsFormEmailDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormEmail;

  protected emailValidator = (control: AbstractControl) => {
    if (!control.value || email(control.value)) {
      return null;
    }

    return { email: true };
  }

  ngOnChanges() {
    if (this.isEnabled(this.fsFormEmail)) {
      this.addValidator(this.emailValidator);
    } else {
      this.removeValidator(this.emailValidator);
    }
  }
}
