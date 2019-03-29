import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';

@Directive({
  selector: '[fsFormRequired]'
})
export class FsFormRequiredDirective extends FsControlDirective implements AfterViewInit {
  @Input() fsFormRequired: boolean;

  ngAfterViewInit() {
    if (this.isEnabled(this.fsFormRequired)) {
        this.addValidator(Validators.required);
    } else {
        this.removeValidator(Validators.required);
    }
  }
}
