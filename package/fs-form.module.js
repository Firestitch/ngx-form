"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@firestitch/common");
var fsformcommon_service_1 = require("./services/fsformcommon.service");
var fsform_service_1 = require("./services/fsform.service");
var core_1 = require("@angular/core");
var common_2 = require("@angular/common");
var fsform_directive_1 = require("./fsform.directive");
var FsFormModule = (function () {
    function FsFormModule() {
    }
    FsFormModule_1 = FsFormModule;
    FsFormModule.forRoot = function () {
        return {
            ngModule: FsFormModule_1,
            providers: [
                fsformcommon_service_1.FsFormCommon,
                fsform_service_1.FsForm,
                fsform_directive_1.FsFormDirective
            ]
        };
    };
    FsFormModule = FsFormModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_2.CommonModule,
                common_1.FsCommonModule
            ],
            exports: [
                fsform_directive_1.FsFormDirective,
                fsform_directive_1.FsControlDirective,
                fsform_directive_1.FsFormRequiredDirective,
                fsform_directive_1.FsFormMinDirective,
                fsform_directive_1.FsFormMaxDirective,
                fsform_directive_1.FsFormMinLengthDirective,
                fsform_directive_1.FsFormMaxLengthDirective,
                fsform_directive_1.FsFormEmailDirective,
                fsform_directive_1.FsFormPhoneDirective,
                fsform_directive_1.FsFormCompareDirective,
                fsform_directive_1.FsFormIntegerDirective,
                fsform_directive_1.FsFormNumericDirective,
                fsform_directive_1.FsFormPatternDirective,
                fsform_directive_1.FsFormFunctionDirective
            ],
            entryComponents: [],
            declarations: [
                fsform_directive_1.FsFormDirective,
                fsform_directive_1.FsControlDirective,
                fsform_directive_1.FsFormRequiredDirective,
                fsform_directive_1.FsFormMinDirective,
                fsform_directive_1.FsFormMaxDirective,
                fsform_directive_1.FsFormMinLengthDirective,
                fsform_directive_1.FsFormMaxLengthDirective,
                fsform_directive_1.FsFormEmailDirective,
                fsform_directive_1.FsFormPhoneDirective,
                fsform_directive_1.FsFormCompareDirective,
                fsform_directive_1.FsFormIntegerDirective,
                fsform_directive_1.FsFormNumericDirective,
                fsform_directive_1.FsFormPatternDirective,
                fsform_directive_1.FsFormFunctionDirective
            ],
            providers: [
                fsformcommon_service_1.FsFormCommon,
                fsform_service_1.FsForm,
                fsform_directive_1.FsFormDirective
            ],
        })
    ], FsFormModule);
    return FsFormModule;
    var FsFormModule_1;
}());
exports.FsFormModule = FsFormModule;
//# sourceMappingURL=fs-form.module.js.map