import { Directive, OnChanges, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';


@Directive({
  selector: '[fsFormMax]'
})
export class FsFormMaxDirective extends FsControlDirective implements OnInit {
  @Input() public fsFormMax;

  ngOnInit() {
      super.addValidator(Validators.max(this.fsFormMax));
  }
}
