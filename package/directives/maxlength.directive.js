var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FsControlDirective } from './fscontrol.directive';
var FsFormMaxLengthDirective = (function (_super) {
    __extends(FsFormMaxLengthDirective, _super);
    function FsFormMaxLengthDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FsFormMaxLengthDirective.prototype.ngOnInit = function () {
        _super.prototype.addValidator.call(this, Validators.maxLength(this.fsFormMaxLength));
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsFormMaxLengthDirective.prototype, "fsFormMaxLength", void 0);
    FsFormMaxLengthDirective = __decorate([
        Directive({
            selector: '[fsFormMaxLength]'
        })
    ], FsFormMaxLengthDirective);
    return FsFormMaxLengthDirective;
}(FsControlDirective));
export { FsFormMaxLengthDirective };
//# sourceMappingURL=maxlength.directive.js.map