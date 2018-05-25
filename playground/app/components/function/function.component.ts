import { NgModule, Component } from '@angular/core';

@Component({
  selector: 'function',
  templateUrl: 'function.component.html'
})
export class FunctionComponent {

  protected email = 'existing@email.com';
  protected minLength = 3;

  public functionPromise = ((formControl) => {
    
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

  public functionException = ((formControl) => {

    if(String(formControl.value).length<=this.minLength)
      throw 'The length must be greater then 3 characters';
    
  }).bind(this);

  anonymousFunctionException(formControl) {

    if(String(formControl.value).length<=3)
      throw 'The length must be greater then 3 characters';
    
  }
}
