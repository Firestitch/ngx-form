var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { FsCommonModule } from '@firestitch/common';
import { FsFormCommon } from './services/fsformcommon.service';
import { FsForm } from './services/fsform.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsFormDirective, FsControlDirective, FsFormRequiredDirective, FsFormMinDirective, FsFormMaxDirective, FsFormMinLengthDirective, FsFormMaxLengthDirective, FsFormEmailDirective, FsFormPhoneDirective, FsFormCompareDirective, FsFormIntegerDirective, FsFormNumericDirective, FsFormPatternDirective, FsFormFunctionDirective } from './directives';
var FsFormModule = (function () {
    function FsFormModule() {
    }
    FsFormModule_1 = FsFormModule;
    FsFormModule.forRoot = function () {
        return {
            ngModule: FsFormModule_1,
            providers: [
                FsFormCommon,
                FsForm,
                FsFormDirective
            ]
        };
    };
    FsFormModule = FsFormModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FsCommonModule
            ],
            exports: [
                FsFormDirective,
                FsControlDirective,
                FsFormRequiredDirective,
                FsFormMinDirective,
                FsFormMaxDirective,
                FsFormMinLengthDirective,
                FsFormMaxLengthDirective,
                FsFormEmailDirective,
                FsFormPhoneDirective,
                FsFormCompareDirective,
                FsFormIntegerDirective,
                FsFormNumericDirective,
                FsFormPatternDirective,
                FsFormFunctionDirective
            ],
            entryComponents: [],
            declarations: [
                FsFormDirective,
                FsControlDirective,
                FsFormRequiredDirective,
                FsFormMinDirective,
                FsFormMaxDirective,
                FsFormMinLengthDirective,
                FsFormMaxLengthDirective,
                FsFormEmailDirective,
                FsFormPhoneDirective,
                FsFormCompareDirective,
                FsFormIntegerDirective,
                FsFormNumericDirective,
                FsFormPatternDirective,
                FsFormFunctionDirective
            ],
            providers: [
                FsFormCommon,
                FsForm,
                FsFormDirective
            ],
        })
    ], FsFormModule);
    return FsFormModule;
    var FsFormModule_1;
}());
export { FsFormModule };
//# sourceMappingURL=fs-form.module.js.map