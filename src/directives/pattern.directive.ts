import { Directive, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormPattern]'
})
export class FsFormPatternDirective extends FsControlDirective implements OnInit {
  @Input() fsFormPattern: RegExp;

  ngOnInit() {
      super.addValidator(Validators.pattern(this.fsFormPattern));
  }
}
