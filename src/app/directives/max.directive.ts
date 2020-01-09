import { Directive, Input, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './control.directive';
import { FsValidators } from '../validators/validators';


@Directive({
  selector: '[fsFormMax]'
})
export class FsFormMaxDirective extends FsControlDirective implements AfterViewInit {

  @Input() public fsFormMax: number;

  public ngAfterViewInit() {
    this.addValidator(FsValidators.numeric);
    this.addValidator(Validators.max(this.fsFormMax));
  }
}
