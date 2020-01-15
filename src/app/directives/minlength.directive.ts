import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';

@Directive({
  selector: '[fsFormMinLength]'
})
export class FsFormMinLengthDirective extends FsControlDirective implements AfterViewInit {

  @Input() fsFormMinLength: number;

  public ngAfterViewInit() {
    this.addValidator(Validators.minLength(this.fsFormMinLength));
  }
}
