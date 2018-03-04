import { Directive, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';

@Directive({
  selector: '[fsFormFunction]'
})
export class FsFormFunctionDirective extends FsControlDirective implements OnInit {
  @Input() fsFormFunction;

  ngOnInit() {

      super.addAsyncValidator(() => {
          const result = this.fsFormFunction(this.controlRef);

          if (result instanceof Promise) {
              return new Promise((resolve, reject) => {
                  result.then(() => {
                      resolve(null);
                  })
                  .catch((err) => {
                      resolve({ validationError: err });
                  });
              });
          }
      });
  }
}
