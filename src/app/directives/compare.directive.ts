import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { FsControlDirective } from './fscontrol.directive';


@Directive({
  selector: '[fsFormCompare]'
})
export class FsFormCompareDirective extends FsControlDirective implements OnInit, OnDestroy {
  @Input() fsFormCompare;

  validator = () => {
    if (this.fsFormCompare.value === this.elementRef.nativeElement.value) {
        return null;
    } else {
        return { compare: true };
    }
  }

  ngOnInit() {
    super.addValidator(this.validator);

    this.fsFormCompare.addEventListener('keyup', () => {
      this.ngControl.control.updateValueAndValidity();
    }, false);
  }

  ngOnDestroy() {
    this.fsFormCompare.removeEventListener('keyup', () => {
      this.ngControl.control.updateValueAndValidity();
    }, false);
  }
}
