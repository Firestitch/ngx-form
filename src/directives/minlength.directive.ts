import { Directive, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormMinLength]'
})
export class FsFormMinLengthDirective extends FsControlDirective implements OnInit {
  @Input() fsFormMinLength;

  ngOnInit() {
      super.addValidator(Validators.minLength(this.fsFormMinLength));
  }
}
