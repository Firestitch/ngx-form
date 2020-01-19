export function AfterViewInit( func: Function ): any {

  return function ( constructor ) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngAfterViewInit = function () {

      func.apply(this);

      original && typeof original === 'function' && original.apply(this, arguments);
    };
  }

}