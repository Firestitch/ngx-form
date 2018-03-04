import { Directive, OnChanges, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormRequired]'
})
export class FsFormRequiredDirective extends FsControlDirective implements OnChanges {
  @Input() fsFormRequired: boolean;

  ngOnChanges() {
      if (this.fsFormRequired !== false) {
          super.addValidator(Validators.required);
      }else {
          super.removeValidator(Validators.required);
      }
  }
}
