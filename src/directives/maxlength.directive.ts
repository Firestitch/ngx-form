import { Directive, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormMaxLength]'
})
export class FsFormMaxLengthDirective extends FsControlDirective implements OnInit {
  @Input() fsFormMaxLength;

  ngOnInit() {
      super.addValidator(Validators.maxLength(this.fsFormMaxLength));
  }
}
