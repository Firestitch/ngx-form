import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormCompare]'
})
export class FsFormCompareDirective extends FsControlDirective implements OnInit, OnDestroy {
  @Input() fsFormCompare;

  validator = () => {
    if (this.fsFormCompare.value === this.elRef.nativeElement.value) {
        return null;
    } else {
        return { compare: true };
    }
  }

  ngOnInit() {
    super.addValidator(this.validator);

    this.fsFormCompare.addEventListener('keyup', () => {
      this.controlRef.control.updateValueAndValidity();
    }, false);
  }

  ngOnDestroy() {
    this.fsFormCompare.removeEventListener('keyup', () => {
      this.controlRef.control.updateValueAndValidity();
    }, false);
  }
}
