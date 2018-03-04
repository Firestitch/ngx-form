import { Directive, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormMin]'
})
export class FsFormMinDirective extends FsControlDirective implements OnInit {
  @Input() fsFormMin;
  ngOnInit() {
      super.addValidator(Validators.min(this.fsFormMin));
  }
}
