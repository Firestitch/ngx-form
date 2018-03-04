import { Directive, OnChanges, Input, OnInit } from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormInteger]'
})
export class FsFormIntegerDirective extends FsControlDirective implements OnInit {
  @Input() fsFormInteger;

  ngOnInit() {
      if (this.fsFormInteger) {
          super.addValidator((control: AbstractControl): { [key: string]: boolean } => {
              if (this.fsFormCommon.isInt(control.value)) {
                  return null;
              } else {
                  return { integer: true }
              }
          });
      }
  }
}
