import { Directive, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FsControlDirective } from './control.directive';


@Directive({
  selector: '[fsFormCompare]'
})
export class FsFormCompareDirective extends FsControlDirective implements AfterViewInit, OnDestroy {
  @Input() fsFormCompare;

  private validator = () => {
    if (this.fsFormCompare.value === this.elementRef.nativeElement.value) {
        return null;
    } else {
        return { compare: true };
    }
  }

  ngAfterViewInit() {
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
