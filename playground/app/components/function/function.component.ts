import { Component, ViewChild } from '@angular/core';
import { FsMessage } from '@firestitch/message';

@Component({
  selector: 'function',
  templateUrl: 'function.component.html',
  styleUrls: ['function.component.scss']
})
export class FunctionComponent {

  constructor(private fsMessage: FsMessage) {}

  @ViewChild('form', { static: false }) form;

  public email = 'existing@email.com';
  public minLength = 3;
  public radioFunctionModel = null;
  public radioFunctionWeeks = '';
  public radioFunctionDate = null;
  public functionPromise = null;
  public functionException = null;
  public functionAnonymous = null;

  public functionPromiseFn = ((formControl) => {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const testValue = formControl.value;
        if (testValue !== this.email) {
          reject('Email should match ' + this.email);
        } else {
          resolve();
        }
      }, 300);
    });

  }).bind(this);


  public functionExceptionFn = ((formControl) => {

    if (String(formControl.value).length <= this.minLength) {
      throw 'The length must be greater then 3 characters';
    }

  }).bind(this);

  public anonymousFunctionException(formControl) {

    if (String(formControl.value).length <= 3) {
      throw 'The length must be greater then 3 characters';
    }
  }

  public radioFunctionChange() {
    this.form.controls.radio_function.updateValueAndValidity();
  };

  public radioFunction = ((formControl) => {

    if (formControl.dirty && !this.radioFunctionModel) {
      throw 'Invalid selection.';
    }

    if (this.form.controls.radioFunctionDate &&
        this.form.controls.radioFunctionDate.dirty &&
        this.radioFunctionModel==='date' &&
        !this.radioFunctionDate) {
          throw 'Invalid date selection.';
    }

    if (this.form.controls.radioFunctionWeeks &&
        this.form.controls.radioFunctionWeeks.dirty &&
        this.radioFunctionModel==='weeks' &&
        !this.radioFunctionWeeks) {
          throw 'Invalid week selection.';
    }

  }).bind(this);

  public save() {
    this.fsMessage.success('Validation successful');
  }
}
