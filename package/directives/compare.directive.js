"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fscontrol_directive_1 = require("./fscontrol.directive");
var FsFormCompareDirective = (function (_super) {
    __extends(FsFormCompareDirective, _super);
    function FsFormCompareDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validator = function () {
            if (_this.fsFormCompare.value === _this.elRef.nativeElement.value) {
                return null;
            }
            else {
                return { compare: true };
            }
        };
        return _this;
    }
    FsFormCompareDirective.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.addValidator.call(this, this.validator);
        this.fsFormCompare.addEventListener('keyup', function () {
            _this.controlRef.control.updateValueAndValidity();
        }, false);
    };
    FsFormCompareDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.fsFormCompare.removeEventListener('keyup', function () {
            _this.controlRef.control.updateValueAndValidity();
        }, false);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormCompareDirective.prototype, "fsFormCompare", void 0);
    FsFormCompareDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormCompare]'
        })
    ], FsFormCompareDirective);
    return FsFormCompareDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormCompareDirective = FsFormCompareDirective;
//# sourceMappingURL=compare.directive.js.map