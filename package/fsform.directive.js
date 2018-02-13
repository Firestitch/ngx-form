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
var forms_1 = require("@angular/forms");
var fsformcommon_service_1 = require("./services/fsformcommon.service");
var fsform_service_1 = require("./services/fsform.service");
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
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormRequiredMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormEmailMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormPhoneMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormNumericMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormIntegerMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormMinMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormMaxMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormMinlengthMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormMaxlengthMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormCompareMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormPatternMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsControlDirective.prototype, "fsFormErrorsOrder", void 0);
    FsControlDirective = __decorate([
        core_1.Directive({
            selector: '[fsControl]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2,
            forms_1.NgControl,
            core_1.ViewContainerRef,
            fsformcommon_service_1.FsFormCommon])
    ], FsControlDirective);
    return FsControlDirective;
}());
exports.FsControlDirective = FsControlDirective;
var FsFormRequiredDirective = (function (_super) {
    __extends(FsFormRequiredDirective, _super);
    function FsFormRequiredDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormRequiredDirective.prototype.ngOnChanges = function () {
        if (this.fsFormRequired !== false) {
            _super.prototype.addValidator.call(this, forms_1.Validators.required);
        }
        else {
            _super.prototype.removeValidator.call(this, forms_1.Validators.required);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FsFormRequiredDirective.prototype, "fsFormRequired", void 0);
    FsFormRequiredDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormRequired]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormRequiredDirective);
    return FsFormRequiredDirective;
}(FsControlDirective));
exports.FsFormRequiredDirective = FsFormRequiredDirective;
var FsFormMaxDirective = (function (_super) {
    __extends(FsFormMaxDirective, _super);
    function FsFormMaxDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormMaxDirective.prototype.ngOnInit = function () {
        _super.prototype.addValidator.call(this, forms_1.Validators.max(this.fsFormMax));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormMaxDirective.prototype, "fsFormMax", void 0);
    FsFormMaxDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormMax]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormMaxDirective);
    return FsFormMaxDirective;
}(FsControlDirective));
exports.FsFormMaxDirective = FsFormMaxDirective;
var FsFormMinDirective = (function (_super) {
    __extends(FsFormMinDirective, _super);
    function FsFormMinDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormMinDirective.prototype.ngOnInit = function () {
        _super.prototype.addValidator.call(this, forms_1.Validators.min(this.fsFormMin));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormMinDirective.prototype, "fsFormMin", void 0);
    FsFormMinDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormMin]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormMinDirective);
    return FsFormMinDirective;
}(FsControlDirective));
exports.FsFormMinDirective = FsFormMinDirective;
var FsFormMinLengthDirective = (function (_super) {
    __extends(FsFormMinLengthDirective, _super);
    function FsFormMinLengthDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormMinLengthDirective.prototype.ngOnInit = function () {
        _super.prototype.addValidator.call(this, forms_1.Validators.minLength(this.fsFormMinLength));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormMinLengthDirective.prototype, "fsFormMinLength", void 0);
    FsFormMinLengthDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormMinLength]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormMinLengthDirective);
    return FsFormMinLengthDirective;
}(FsControlDirective));
exports.FsFormMinLengthDirective = FsFormMinLengthDirective;
var FsFormMaxLengthDirective = (function (_super) {
    __extends(FsFormMaxLengthDirective, _super);
    function FsFormMaxLengthDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormMaxLengthDirective.prototype.ngOnInit = function () {
        _super.prototype.addValidator.call(this, forms_1.Validators.maxLength(this.fsFormMaxLength));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormMaxLengthDirective.prototype, "fsFormMaxLength", void 0);
    FsFormMaxLengthDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormMaxLength]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormMaxLengthDirective);
    return FsFormMaxLengthDirective;
}(FsControlDirective));
exports.FsFormMaxLengthDirective = FsFormMaxLengthDirective;
var FsFormEmailDirective = (function (_super) {
    __extends(FsFormEmailDirective, _super);
    function FsFormEmailDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
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
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormEmailDirective.prototype, "fsFormEmail", void 0);
    FsFormEmailDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormEmail]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormEmailDirective);
    return FsFormEmailDirective;
}(FsControlDirective));
exports.FsFormEmailDirective = FsFormEmailDirective;
var FsFormPhoneDirective = (function (_super) {
    __extends(FsFormPhoneDirective, _super);
    function FsFormPhoneDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormPhoneDirective.prototype.ngOnChanges = function () {
        var _this = this;
        var validator = function () {
            if (_this.fsFormCommon.phone(_this.elRef.nativeElement.value)) {
                return null;
            }
            return { phone: true };
        };
        if (this.fsFormPhone) {
            _super.prototype.addValidator.call(this, validator);
        }
        else {
            _super.prototype.removeValidator.call(this, validator);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormPhoneDirective.prototype, "fsFormPhone", void 0);
    FsFormPhoneDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormPhone]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormPhoneDirective);
    return FsFormPhoneDirective;
}(FsControlDirective));
exports.FsFormPhoneDirective = FsFormPhoneDirective;
var FsFormCompareDirective = (function (_super) {
    __extends(FsFormCompareDirective, _super);
    function FsFormCompareDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormCompareDirective.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.addValidator.call(this, function () {
            if (_this.fsFormCompare.value === _this.elRef.nativeElement.value) {
                return null;
            }
            else {
                return { compare: true };
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormCompareDirective.prototype, "fsFormCompare", void 0);
    FsFormCompareDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormCompare]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormCompareDirective);
    return FsFormCompareDirective;
}(FsControlDirective));
exports.FsFormCompareDirective = FsFormCompareDirective;
var FsFormIntegerDirective = (function (_super) {
    __extends(FsFormIntegerDirective, _super);
    function FsFormIntegerDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormIntegerDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.fsFormInteger) {
            _super.prototype.addValidator.call(this, function (control) {
                if (_this.fsFormCommon.isInt(control.value)) {
                    return null;
                }
                else {
                    return { integer: true };
                }
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormIntegerDirective.prototype, "fsFormInteger", void 0);
    FsFormIntegerDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormInteger]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormIntegerDirective);
    return FsFormIntegerDirective;
}(FsControlDirective));
exports.FsFormIntegerDirective = FsFormIntegerDirective;
var FsFormNumericDirective = (function (_super) {
    __extends(FsFormNumericDirective, _super);
    function FsFormNumericDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormNumericDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.fsFormNumeric) {
            _super.prototype.addValidator.call(this, function (control) {
                if (_this.fsFormCommon.isNumeric(control.value)) {
                    return null;
                }
                else {
                    return { numeric: true };
                }
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormNumericDirective.prototype, "fsFormNumeric", void 0);
    FsFormNumericDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormNumeric]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormNumericDirective);
    return FsFormNumericDirective;
}(FsControlDirective));
exports.FsFormNumericDirective = FsFormNumericDirective;
var FsFormPatternDirective = (function (_super) {
    __extends(FsFormPatternDirective, _super);
    function FsFormPatternDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormPatternDirective.prototype.ngOnInit = function () {
        _super.prototype.addValidator.call(this, forms_1.Validators.pattern(this.fsFormPattern));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", RegExp)
    ], FsFormPatternDirective.prototype, "fsFormPattern", void 0);
    FsFormPatternDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormPattern]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormPatternDirective);
    return FsFormPatternDirective;
}(FsControlDirective));
exports.FsFormPatternDirective = FsFormPatternDirective;
var FsFormFunctionDirective = (function (_super) {
    __extends(FsFormFunctionDirective, _super);
    function FsFormFunctionDirective(elRef, renderer, controlRef, viewContainer, fsFormCommon) {
        return _super.call(this, elRef, renderer, controlRef, viewContainer, fsFormCommon) || this;
    }
    FsFormFunctionDirective.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.addAsyncValidator.call(this, function () {
            var result = _this.fsFormFunction(_this.controlRef);
            if (result instanceof Promise) {
                return new Promise(function (resolve, reject) {
                    result.then(function () {
                        resolve(null);
                    })
                        .catch(function (err) {
                        resolve({ validationError: err });
                    });
                });
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormFunctionDirective.prototype, "fsFormFunction", void 0);
    FsFormFunctionDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormFunction]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, forms_1.NgControl, core_1.ViewContainerRef, fsformcommon_service_1.FsFormCommon])
    ], FsFormFunctionDirective);
    return FsFormFunctionDirective;
}(FsControlDirective));
exports.FsFormFunctionDirective = FsFormFunctionDirective;
var FsFormDirective = (function () {
    function FsFormDirective(elRef, vc, fsForm) {
        this.elRef = elRef;
        this.vc = vc;
        this.fsForm = fsForm;
    }
    FsFormDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.fsFormBinding) {
            this.fsFormBinding.ngSubmit.subscribe(function (res) {
                _this.fsForm.broadcast('submit', _this.fsFormBinding);
                if (_this.fsFormBinding.form.status === 'INVALID') {
                    _this.fsForm.broadcast('invalid', _this.fsFormBinding);
                    for (var key in _this.fsFormBinding.controls) {
                        if (!_this.fsFormBinding.controls[key]) {
                            continue;
                        }
                        _this.fsFormBinding.controls[key].markAsDirty();
                        _this.fsFormBinding.controls[key].updateValueAndValidity();
                    }
                }
                else {
                    _this.fsForm.broadcast('valid', _this.fsFormBinding);
                }
            });
        }
    };
    FsFormDirective.prototype.ngOnDestroy = function () {
        this.fsFormBinding.ngSubmit.unsubscribe();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.NgForm)
    ], FsFormDirective.prototype, "fsFormBinding", void 0);
    FsFormDirective = __decorate([
        core_1.Directive({
            selector: '[fsForm]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.ViewContainerRef,
            fsform_service_1.FsForm])
    ], FsFormDirective);
    return FsFormDirective;
}());
exports.FsFormDirective = FsFormDirective;
//# sourceMappingURL=fsform.directive.js.map