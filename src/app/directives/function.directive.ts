import { Directive, Input, AfterViewInit } from '@angular/core';
import { FsControlDirective } from './control.directive';


@Directive({
  selector: '[fsFormFunction]'
})
export class FsFormFunctionDirective extends FsControlDirective implements AfterViewInit {
  @Input() fsFormFunction;

  ngAfterViewInit() {

      this.addAsyncValidator(() => {

          return new Promise((resolve, reject) => {
            try {
              const result = this.fsFormFunction(this.ngControl);
              if (result instanceof Promise) {
                result.then(() => {
                  return resolve(null);
                })
                .catch((err) => {
                  return resolve({ validationError: err });
                });
              } else {
                return resolve(null);
              }
            } catch (e) {
              resolve({ validationError: e });
            }
          });
      });
  }
}
