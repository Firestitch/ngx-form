import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { FsMessage } from '@firestitch/message';

import { of, throwError } from 'rxjs';

@Component({
  selector: 'function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunctionComponent {

  @ViewChild('form', { static: true }) form;

  public email = 'existing@email.com';
  public minLength = 3;
  public radioFunctionModel = null;
  public radioFunctionWeeks = '';
  public radioFunctionDate = null;
  public functionPromise = null;
  public functionException = null;
  public functionAnonymous = null;


  constructor(
    private _message: FsMessage,
  ) { }

  public validateObservable = (formControl) => {
    if (formControl.value !== this.email) {
      return throwError(`Email should match ${  this.email}`);
    }

    return of(true);
  };

  public validateException = (formControl, data) => {
    if (String(formControl.value).length <= this.minLength) {
      throw new Error('The length must be greater then 3 characters');
    }
  };

  public anonymousFunctionException(formControl) {
    if (String(formControl.value).length <= 3) {
      throw 'The length must be greater then 3 characters';
    }
  }

  public radioFunctionChange() {
    this.form.controls.radio_function.updateValueAndValidity();
  }

  public radioFunction = ((formControl) => {
    if (formControl.dirty && !this.radioFunctionModel) {
      throw 'Invalid selection.';
    }

    if (this.form.controls.radioFunctionDate &&
      this.form.controls.radioFunctionDate.dirty &&
      this.radioFunctionModel === 'date' &&
      !this.radioFunctionDate) {
      throw 'Invalid date selection.';
    }

    if (this.form.controls.radioFunctionWeeks &&
      this.form.controls.radioFunctionWeeks.dirty &&
      this.radioFunctionModel === 'weeks' &&
      !this.radioFunctionWeeks) {
      throw 'Invalid week selection.';
    }

  });

  public save() {
    this._message.success('Validation successful');
  }
}
