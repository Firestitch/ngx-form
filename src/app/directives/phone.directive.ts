import { Directive, Input, AfterViewInit, OnChanges } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { AbstractControl } from '@angular/forms';
import { phone } from '@firestitch/common';


@Directive({
  selector: '[fsFormPhone]'
})
export class FsFormPhoneDirective extends FsControlDirective implements OnChanges {

  @Input() public fsFormPhone;

  private phoneValidator = (control: AbstractControl) => {

    if (!control.value || phone(control.value)) {
        return null;
    }

    return { phone: true };
  }

  public ngOnChanges() {
    if (this.isEnabled(this.fsFormPhone)) {
      this.addValidator(this.phoneValidator);
    } else {
      this.removeValidator(this.phoneValidator)
    }
  }
}
