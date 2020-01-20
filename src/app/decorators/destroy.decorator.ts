// export function Destroy(): any {

//   return function ( constructor ) {
//     const original = constructor.prototype.ngOnDestroy;

//     constructor.prototype.ngOnDestroy = function () {

//       this._formDestroy();

//       original && typeof original === 'function' && original.apply(this, arguments);
//     };
//   }
// }


export function Destroy(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
  const originalMethod = descriptor.value;
console.log("TEST!!!")
    const original = target.constructor.prototype.ngOnDestroy;

    target.constructor.prototype.ngOnDestroy = function () {

      const result = originalMethod.apply(this);

      original && typeof original === 'function' && original.apply(this, arguments);
    };

  return descriptor;
}