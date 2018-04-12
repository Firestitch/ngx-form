var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FsFormCommon } from './../services/fsformcommon.service';
var FsControlDirective = (function () {
    function FsControlDirective(ElementRef, Renderer2, NgControl, ViewContainerRef, FsFormCommon) {
        var _this = this;
        this.fsFormRequiredMessage = 'This field is required.';
        this.fsFormEmailMessage = 'This is not a valid email address.';
        this.fsFormPhoneMessage = 'Invalid phone number.';
        this.fsFormNumericMessage = 'Value should be numeric.';
        this.fsFormIntegerMessage = 'Value should be an integer.';
        this.fsFormMinMessage = 'Should not be less than $(1).';
        this.fsFormMaxMessage = 'Should not be bigger than $(1).';
        this.fsFormMinlengthMessage = 'Should not be shorter than $(1) characters.';
        this.fsFormMaxlengthMessage = 'Should not be longer than $(1) characters.';
        this.fsFormCompareMessage = 'Inputs do not match.';
        this.fsFormPatternMessage = 'Value should match pattern $(1)';
        this.fsFormErrorsOrder = [];
        this.fsFormCommon = FsFormCommon;
        this.elRef = ElementRef;
        this.renderer = Renderer2;
        this.controlRef = NgControl;
        this.viewContainer = ViewContainerRef;
        this.statusChanges$ = this.controlRef.control.statusChanges.subscribe(function (res) {
            FsFormCommon.renderErrors(_this, _this.controlRef, _this.renderer, _this.elRef);
        });
        this.controlRef.control['fsValidators'] = this.controlRef.control['fsValidators'] || [];
        this.controlRef.control['fsAsyncValidators'] = this.controlRef.control['fsAsyncValidators'] || [];
    }
    FsControlDirective.prototype.ngOnDestroy = function () {
        this.statusChanges$.unsubscribe();
    };
    // If the  inputs are not visible (display: none) then don't include the input in the validation
    FsControlDirective.prototype.ngAfterViewChecked = function () {
        var _this = this;
        var element = this.elRef;
        // If not visible
        if (element.nativeElement.offsetParent === null) {
            this.controlRef.control.clearValidators();
            this.controlRef.control.clearAsyncValidators();
        }
        else {
            // Hack. If element visible, has no validatio but exist some validation rules -
            // updating validators and triggering change event (For some reason inputs assign
            // new rules only oinit and on change events
            if ((this.controlRef.control['fsValidators'].length && !this.controlRef.control.validator) ||
                (this.controlRef.control['fsAsyncValidators'].length && !this.controlRef.control.asyncValidator)) {
                this.updateValidators();
                setTimeout(function () {
                    _this.controlRef.control.setValue(_this.controlRef.control.value);
                });
            }
        }
    };
    FsControlDirective.prototype.updateValidators = function () {
        this.controlRef.control.setValidators(this.controlRef.control['fsValidators']);
        this.controlRef.control.setAsyncValidators(this.controlRef.control['fsAsyncValidators']);
        this.controlRef.control.updateValueAndValidity();
    };
    FsControlDirective.prototype.addValidator = function (validator) {
        this.controlRef.control['fsValidators'].push(validator);
        this.updateValidators();
    };
    FsControlDirective.prototype.removeValidator = function (validator) {
        var index = this.fsFormCommon.searchIndex(this.controlRef.control['fsValidators'], validator);
        if (index !== -1) {
            this.controlRef.control['fsValidators'].splice(index, 1);
            this.updateValidators();
        }
    };
    FsControlDirective.prototype.addAsyncValidator = function (validator) {
        this.controlRef.control['fsAsyncValidators'].push(validator);
        this.controlRef.control.setAsyncValidators(this.controlRef.control['fsAsyncValidators']);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormRequiredMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormEmailMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormPhoneMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormNumericMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormIntegerMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormMinMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormMaxMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormMinlengthMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormMaxlengthMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormCompareMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormPatternMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormErrorsOrder", void 0);
    FsControlDirective = __decorate([
        Directive({
            selector: '[fsControl]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            NgControl,
            ViewContainerRef,
            FsFormCommon])
    ], FsControlDirective);
    return FsControlDirective;
}());
export { FsControlDirective };
//# sourceMappingURL=fscontrol.directive.js.map