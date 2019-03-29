import { Directive, Input, AfterViewInit } from '@angular/core';

import { FsControlDirective } from './control.directive';
import { AbstractControl } from '@angular/forms';
import { phone } from '@firestitch/common';


@Directive({
  selector: '[fsFormPhone]'
})
export class FsFormPhoneDirective extends FsControlDirective implements AfterViewInit {

  @Input() public fsFormPhone;

  public ngAfterViewInit() {

    this.addValidator((control: AbstractControl) => {

      if (!this.isEnabled(this.fsFormPhone) || !control.value || phone(control.value)) {
          return null;
      }

      return { phone: true };
    });
  }
}
