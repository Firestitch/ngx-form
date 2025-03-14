import {
  Directive,
} from '@angular/core';


import { ConfirmConfig } from '../../interfaces';
import { FsFormDirective } from '../form';
import { FsFormBaseDirective } from '../form-base';


@Directive({
  selector: '[fsFormGroup]',
  exportAs: 'fsFormGroup',
})
export class FsFormGroupDirective extends FsFormBaseDirective {

  private _formDirective: FsFormDirective;

  public triggerSubmit() {
    return this._formDirective?.triggerSubmit();
  }

  public triggerConfirm() {
    return this._formDirective?.triggerConfirm();
  }

  public get submitting(): boolean {
    return this._formDirective?.submitting;
  }

  public get confirm(): ConfirmConfig | boolean {
    return this._formDirective?.confirm;
  }

  public registerForm(formDirective: FsFormDirective) {
    this._formDirective = formDirective;
  }

  public deregisterForm() {
    this._formDirective = null;
  }
}
