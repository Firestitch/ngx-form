export function AfterViewInit(): any {

  return function ( constructor ) {
    const original = constructor.prototype.ngOnDestroy;


    constructor.prototype.ngAfterViewInit = function () {

      this._formAfterViewInit();

      original && typeof original === 'function' && original.apply(this, arguments);
    };
  }
}