var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { FsArray, FsUtil, FsValidate } from '@firestitch/common';
var FsFormCommon = (function () {
    function FsFormCommon(fsArray, fsUtil, fsValidate) {
        this.fsArray = fsArray;
        this.fsUtil = fsUtil;
        this.fsValidate = fsValidate;
    }
    FsFormCommon.prototype.renderErrors = function (instance, controlRef, renderer, elRef) {
        if (controlRef.dirty) {
            var parentNode = elRef.nativeElement.parentNode;
            if (elRef.nativeElement.tagName === 'FS-CHECKBOX-GROUP') {
                elRef.nativeElement.name = elRef.nativeElement.getAttribute('name');
                var wraperContainer = renderer.createElement('div');
                renderer.addClass(wraperContainer, 'mat-input-subscript-wrapper');
                renderer.addClass(wraperContainer, 'mat-form-field-subscript-wrapper');
                var wraperExist = false;
                for (var i = 0; i < elRef.nativeElement.childNodes.length; i++) {
                    if (elRef.nativeElement.childNodes[i]['className'] && elRef.nativeElement.childNodes[i]['className'].match(/mat-input-subscript-wrapper/)) {
                        wraperExist = true;
                    }
                }
                if (!wraperExist) {
                    renderer.appendChild(elRef.nativeElement, wraperContainer);
                }
            }
            // not the most elegant way to compile errors, but i couldnt get a better one working. right now its depepndant on styles/DOM we have in existing angular-material, which is not right
            var errorContainer = renderer.createElement('div');
            renderer.addClass(errorContainer, 'ng-trigger');
            renderer.addClass(errorContainer, 'ng-trigger-transitionMessages');
            var errors = this.getErrors(instance, controlRef);
            for (var errKey in errors) {
                if (!errors[errKey]) {
                    continue;
                }
                var errorElement = renderer.createElement('mat-error');
                renderer.addClass(errorElement, 'mat-error');
                renderer.setProperty(errorElement, 'id', 'mat-error-' + errKey);
                var errorText = void 0;
                var messageVariable = "fsForm" + this.capitalizeFirstLetter(errKey) + "Message";
                if (instance[messageVariable]) {
                    errorText = renderer.createText(this.parseErrorMessage(instance[messageVariable], errors[errKey]));
                }
                else {
                    errorText = renderer.createText(errors[errKey]);
                }
                renderer.appendChild(errorElement, errorText);
                renderer.appendChild(errorContainer, errorElement);
            }
            // searching for a container if we are at input element
            var elContainer = elRef.nativeElement.parentNode.parentNode.parentNode;
            if (['FS-CHECKBOX-GROUP', 'FS-RADIO-GROUP'].indexOf(elRef.nativeElement.tagName) !== -1) {
                elContainer = elRef.nativeElement;
            }
            var errorPlaceholder = this.findClass(elContainer, 'mat-form-field-subscript-wrapper');
            if (errorPlaceholder) {
                errorPlaceholder.innerHTML = '';
                errorPlaceholder.appendChild(errorContainer);
            }
            else {
                errorPlaceholder = renderer.createElement('div');
                renderer.addClass(errorPlaceholder, 'mat-form-field-subscript-wrapper');
                renderer.appendChild(errorPlaceholder, errorContainer);
                elRef.nativeElement.appendChild(errorPlaceholder);
            }
        }
    };
    FsFormCommon.prototype.getErrors = function (instance, controlRef) {
        var messagesOrder = [];
        for (var _i = 0, _a = instance.fsFormErrorsOrder; _i < _a.length; _i++) {
            var value = _a[_i];
            messagesOrder.push(value.replace(/fsForm/, '').toLowerCase());
        }
        if (messagesOrder.length) {
            for (var _b = 0, messagesOrder_1 = messagesOrder; _b < messagesOrder_1.length; _b++) {
                var value = messagesOrder_1[_b];
                if (controlRef.control.errors[value]) {
                    return _c = {}, _c[value] = controlRef.control.errors[value], _c;
                }
            }
        }
        for (var key in controlRef.control.errors) {
            return _d = {}, _d[key] = controlRef.control.errors[key], _d;
        }
        return {};
        var _c, _d;
    };
    FsFormCommon.prototype.parseErrorMessage = function (message, args) {
        for (var key in args) {
            message = message.replace(/\$\(\d\)/, args[key]);
        }
        return message;
    };
    FsFormCommon.prototype.findClass = function (element, className) {
        var foundElement = null, found;
        function recurse(element, className, found) {
            for (var i = 0; i < element.childNodes.length && !found; i++) {
                var el = element.childNodes[i];
                var classes = void 0;
                if (typeof el.className == 'string')
                    classes = el.className != undefined ? el.className.split(" ") : [];
                else
                    classes = [];
                for (var j = 0, jl = classes.length; j < jl; j++) {
                    if (classes[j] == className) {
                        found = true;
                        foundElement = element.childNodes[i];
                        break;
                    }
                }
                if (found)
                    break;
                recurse(element.childNodes[i], className, found);
            }
        }
        recurse(element, className, false);
        return foundElement;
    };
    FsFormCommon.prototype.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    FsFormCommon.prototype.searchIndex = function (data, item) {
        return this.fsArray.indexOf(data, function (value) {
            return JSON.stringify(value) === JSON.stringify(item);
        });
    };
    FsFormCommon.prototype.isInt = function (value) {
        return !this.fsUtil.string(value).length || this.fsUtil.isInt(value);
    };
    FsFormCommon.prototype.isNumeric = function (value) {
        return !this.fsUtil.string(value).length || this.fsUtil.isNumeric(value);
    };
    FsFormCommon.prototype.phone = function (value) {
        return this.fsValidate.phone(value);
    };
    FsFormCommon.prototype.email = function (value) {
        return this.fsValidate.email(value);
    };
    FsFormCommon = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [FsArray, FsUtil, FsValidate])
    ], FsFormCommon);
    return FsFormCommon;
}());
export { FsFormCommon };
//# sourceMappingURL=fsformcommon.service.js.map