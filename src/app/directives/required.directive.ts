import { Directive, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';

@Directive({
  selector: '[fsFormRequired]'
})
export class FsFormRequiredDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormRequired: boolean;

  ngOnChanges() {
    if (this.isEnabled(this.fsFormRequired)) {
        this.addValidator(Validators.required);
    } else {
        this.removeValidator(Validators.required);
    }
  }
}
