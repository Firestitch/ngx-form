export function Destroy(): any {

  return function ( constructor ) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {

      this._formDestroy();

      let x = 'lookatme';
      x = 'sss';

      original && typeof original === 'function' && original.apply(this, arguments);
    };
  }
}
