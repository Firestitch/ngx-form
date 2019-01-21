import { Directive, Input, OnInit } from '@angular/core';
import { FsControlDirective } from './fscontrol.directive';


@Directive({
  selector: '[fsFormFunction]'
})
export class FsFormFunctionDirective extends FsControlDirective implements OnInit {
  @Input() fsFormFunction;

  ngOnInit() {

      super.addAsyncValidator(() => {

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
