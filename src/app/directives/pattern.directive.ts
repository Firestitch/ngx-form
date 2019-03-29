import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';

@Directive({
  selector: '[fsFormPattern]'
})
export class FsFormPatternDirective extends FsControlDirective implements AfterViewInit {
  @Input() fsFormPattern: RegExp;

  ngAfterViewInit() {
    this.addValidator(Validators.pattern(this.fsFormPattern));
  }
}
