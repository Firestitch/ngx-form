import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { url } from '@firestitch/common';

import { FsControlDirective } from './control.directive';

@Directive({
  selector: '[fsFormUrl]'
})
export class FsFormUrlDirective extends FsControlDirective implements OnChanges {
  @Input() public fsFormUrl;

  protected urlValidator = (control: AbstractControl) => {
    if (!control.value || url(control.value)) {
      return null;
    }

    return { url: true };
  };

  public ngOnChanges() {
    if (this.isEnabled(this.fsFormUrl)) {
      this.addValidator(this.urlValidator);
    } else {
      this.removeValidator(this.urlValidator);
    }
  }
}
