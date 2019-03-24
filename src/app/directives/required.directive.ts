import { Directive, OnChanges, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[required]'
})
export class FormRequiredDirective extends FsControlDirective implements OnChanges {
  @Input() required: boolean;

  ngOnChanges() {
    if (this.isEnabled(this.required)) {
        super.addValidator(Validators.required);
    } else {
        super.removeValidator(Validators.required);
    }
  }
}
