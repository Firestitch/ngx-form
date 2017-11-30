import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, Validator, NG_ASYNC_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[asyncEmailValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => FsAsyncValidateDirective), multi: true
    },
  ]
})
export class FsAsyncValidateDirective implements Validator {
  constructor() {
    console.log('FsAsyncValidateDirective1');
  }

  validate(c: AbstractControl) {
    console.log('FsAsyncValidateDirective2', c);
    return new Promise(resolve => {
      console.log('FsAsyncValidateDirective 3');
      resolve({ validateEmailTaken: true })
    });
  }
}