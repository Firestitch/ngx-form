import { AfterViewInit, Directive, Input, OnChanges, OnDestroy } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FsValidator } from '../../interfaces/validator';
import { VALIDATE_MESSAGE_PROVIDER } from '../../providers/validate-messages.provider';

import { FsControlDirective } from './control.directive';


@Directive({
    selector: '[fsFormCompare]',
    providers: [
        VALIDATE_MESSAGE_PROVIDER,
    ],
    standalone: true,
})
export class FsFormCompareDirective extends FsControlDirective
  implements OnChanges, AfterViewInit, OnDestroy, FsValidator {

  @Input()
  public fsFormCompare;

  @Input('fsFormCompareMessage')
  public set validationMessage(value: string) {
    this._validateMessages.compare = value;
  }

  public ngOnChanges(): void {
    this._control.updateValueAndValidity();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (this.fsFormCompare.value === this._elementRef.nativeElement.value) {
      return null;
    }
 
    return { compare: true };
    
  }

  public ngAfterViewInit() {
    this.fsFormCompare.addEventListener('keyup', () => {
      this._control.updateValueAndValidity();
    }, false);
  }

  public ngOnDestroy() {
    this.fsFormCompare.removeEventListener('keyup', () => {
      this._control.updateValueAndValidity();
    }, false);
  }
}
