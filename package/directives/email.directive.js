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
import { FsControlDirective } from './fscontrol.directive';
var FsFormEmailDirective = (function (_super) {
    __extends(FsFormEmailDirective, _super);
    function FsFormEmailDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FsFormEmailDirective.prototype.ngOnChanges = function () {
        var _this = this;
        var validator = function () {
            if (!_this.elRef.nativeElement.value || _this.fsFormCommon.email(_this.elRef.nativeElement.value)) {
                return null;
            }
            return { email: true };
        };
        if (this.fsFormEmail) {
            _super.prototype.addValidator.call(this, validator);
        }
        else {
            _super.prototype.removeValidator.call(this, validator);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsFormEmailDirective.prototype, "fsFormEmail", void 0);
    FsFormEmailDirective = __decorate([
        Directive({
            selector: '[fsFormEmail]'
        })
    ], FsFormEmailDirective);
    return FsFormEmailDirective;
}(FsControlDirective));
export { FsFormEmailDirective };
//# sourceMappingURL=email.directive.js.map