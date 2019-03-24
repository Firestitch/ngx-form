import { Directive, Input, OnChanges, OnInit } from '@angular/core';

import { FsControlDirective } from './fscontrol.directive';
import { AbstractControl } from '@angular/forms';


@Directive({
  selector: '[fsFormPhone]'
})
export class FsFormPhoneDirective extends FsControlDirective implements OnInit {

  @Input() public fsFormPhone;

  public ngOnInit() {

    super.addValidator((control: AbstractControl) => {

      if (!this.isEnabled(this.fsFormPhone) || !control.value || this.fsFormCommon.phone(control.value)) {
          return null;
      }

      return { phone: true };
    });
  }
}
