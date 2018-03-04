import { Directive, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormCompare]'
})
export class FsFormCompareDirective extends FsControlDirective implements OnInit {
  @Input() fsFormCompare;

  ngOnInit() {
      super.addValidator(() => {
          if (this.fsFormCompare.value === this.elRef.nativeElement.value) {
              return null;
          } else {
              return { compare: true };
          }
      });
  }
}
