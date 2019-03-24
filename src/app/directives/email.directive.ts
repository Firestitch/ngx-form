import { Directive, Input, OnInit } from '@angular/core';
import { FsControlDirective } from './fscontrol.directive';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[fsFormEmail]'
})
export class FsFormEmailDirective extends FsControlDirective implements OnInit {
  @Input() fsFormEmail;

  ngOnInit() {

    super.addValidator((control: AbstractControl) => {
      if (!this.isEnabled(this.fsFormEmail) || !control.value || this.fsFormCommon.email(control.value)) {
        return null;
      }

      return { email: true };
    });
  }
}
