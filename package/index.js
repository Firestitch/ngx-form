(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@firestitch/form", [], factory);
	else if(typeof exports === 'object')
		exports["@firestitch/form"] = factory();
	else
		root["@firestitch/form"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./directives/compare.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
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


/***/ }),

/***/ "./directives/email.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
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
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsFormEmailDirective.prototype, "fsFormEmail", void 0);
    FsFormEmailDirective = __decorate([
        core_1.Directive({
            selector: '[fsFormEmail]'
        })
    ], FsFormEmailDirective);
    return FsFormEmailDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormEmailDirective = FsFormEmailDirective;


/***/ }),

/***/ "./directives/fscontrol.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var core_1 = __webpack_require__("@angular/core");
var forms_1 = __webpack_require__("@angular/forms");
var fsformcommon_service_1 = __webpack_require__("./services/fsformcommon.service.ts");
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


/***/ }),

/***/ "./directives/fsform.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var core_1 = __webpack_require__("@angular/core");
var forms_1 = __webpack_require__("@angular/forms");
var fsform_service_1 = __webpack_require__("./services/fsform.service.ts");
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


/***/ }),

/***/ "./directives/function.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
var FsFormFunctionDirective = (function (_super) {
    __extends(FsFormFunctionDirective, _super);
    function FsFormFunctionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        })
    ], FsFormFunctionDirective);
    return FsFormFunctionDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormFunctionDirective = FsFormFunctionDirective;


/***/ }),

/***/ "./directives/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./directives/fscontrol.directive.ts"));
__export(__webpack_require__("./directives/fsform.directive.ts"));
__export(__webpack_require__("./directives/required.directive.ts"));
__export(__webpack_require__("./directives/max.directive.ts"));
__export(__webpack_require__("./directives/min.directive.ts"));
__export(__webpack_require__("./directives/minlength.directive.ts"));
__export(__webpack_require__("./directives/maxlength.directive.ts"));
__export(__webpack_require__("./directives/email.directive.ts"));
__export(__webpack_require__("./directives/phone.directive.ts"));
__export(__webpack_require__("./directives/compare.directive.ts"));
__export(__webpack_require__("./directives/integer.directive.ts"));
__export(__webpack_require__("./directives/numeric.directive.ts"));
__export(__webpack_require__("./directives/pattern.directive.ts"));
__export(__webpack_require__("./directives/function.directive.ts"));


/***/ }),

/***/ "./directives/integer.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
var FsFormIntegerDirective = (function (_super) {
    __extends(FsFormIntegerDirective, _super);
    function FsFormIntegerDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        })
    ], FsFormIntegerDirective);
    return FsFormIntegerDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormIntegerDirective = FsFormIntegerDirective;


/***/ }),

/***/ "./directives/max.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var forms_1 = __webpack_require__("@angular/forms");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
var FsFormMaxDirective = (function (_super) {
    __extends(FsFormMaxDirective, _super);
    function FsFormMaxDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        })
    ], FsFormMaxDirective);
    return FsFormMaxDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormMaxDirective = FsFormMaxDirective;


/***/ }),

/***/ "./directives/maxlength.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var forms_1 = __webpack_require__("@angular/forms");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
var FsFormMaxLengthDirective = (function (_super) {
    __extends(FsFormMaxLengthDirective, _super);
    function FsFormMaxLengthDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        })
    ], FsFormMaxLengthDirective);
    return FsFormMaxLengthDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormMaxLengthDirective = FsFormMaxLengthDirective;


/***/ }),

/***/ "./directives/min.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var forms_1 = __webpack_require__("@angular/forms");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
var FsFormMinDirective = (function (_super) {
    __extends(FsFormMinDirective, _super);
    function FsFormMinDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        })
    ], FsFormMinDirective);
    return FsFormMinDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormMinDirective = FsFormMinDirective;


/***/ }),

/***/ "./directives/minlength.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var forms_1 = __webpack_require__("@angular/forms");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
var FsFormMinLengthDirective = (function (_super) {
    __extends(FsFormMinLengthDirective, _super);
    function FsFormMinLengthDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        })
    ], FsFormMinLengthDirective);
    return FsFormMinLengthDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormMinLengthDirective = FsFormMinLengthDirective;


/***/ }),

/***/ "./directives/numeric.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
var FsFormNumericDirective = (function (_super) {
    __extends(FsFormNumericDirective, _super);
    function FsFormNumericDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        })
    ], FsFormNumericDirective);
    return FsFormNumericDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormNumericDirective = FsFormNumericDirective;


/***/ }),

/***/ "./directives/pattern.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var forms_1 = __webpack_require__("@angular/forms");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
var FsFormPatternDirective = (function (_super) {
    __extends(FsFormPatternDirective, _super);
    function FsFormPatternDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        })
    ], FsFormPatternDirective);
    return FsFormPatternDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormPatternDirective = FsFormPatternDirective;


/***/ }),

/***/ "./directives/phone.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
var FsFormPhoneDirective = (function (_super) {
    __extends(FsFormPhoneDirective, _super);
    function FsFormPhoneDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        })
    ], FsFormPhoneDirective);
    return FsFormPhoneDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormPhoneDirective = FsFormPhoneDirective;


/***/ }),

/***/ "./directives/required.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var forms_1 = __webpack_require__("@angular/forms");
var fscontrol_directive_1 = __webpack_require__("./directives/fscontrol.directive.ts");
var FsFormRequiredDirective = (function (_super) {
    __extends(FsFormRequiredDirective, _super);
    function FsFormRequiredDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        })
    ], FsFormRequiredDirective);
    return FsFormRequiredDirective;
}(fscontrol_directive_1.FsControlDirective));
exports.FsFormRequiredDirective = FsFormRequiredDirective;


/***/ }),

/***/ "./fs-form.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__("@firestitch/common");
var fsformcommon_service_1 = __webpack_require__("./services/fsformcommon.service.ts");
var fsform_service_1 = __webpack_require__("./services/fsform.service.ts");
var core_1 = __webpack_require__("@angular/core");
var common_2 = __webpack_require__("@angular/common");
var directives_1 = __webpack_require__("./directives/index.ts");
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
                directives_1.FsFormDirective
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
                directives_1.FsFormDirective,
                directives_1.FsControlDirective,
                directives_1.FsFormRequiredDirective,
                directives_1.FsFormMinDirective,
                directives_1.FsFormMaxDirective,
                directives_1.FsFormMinLengthDirective,
                directives_1.FsFormMaxLengthDirective,
                directives_1.FsFormEmailDirective,
                directives_1.FsFormPhoneDirective,
                directives_1.FsFormCompareDirective,
                directives_1.FsFormIntegerDirective,
                directives_1.FsFormNumericDirective,
                directives_1.FsFormPatternDirective,
                directives_1.FsFormFunctionDirective
            ],
            entryComponents: [],
            declarations: [
                directives_1.FsFormDirective,
                directives_1.FsControlDirective,
                directives_1.FsFormRequiredDirective,
                directives_1.FsFormMinDirective,
                directives_1.FsFormMaxDirective,
                directives_1.FsFormMinLengthDirective,
                directives_1.FsFormMaxLengthDirective,
                directives_1.FsFormEmailDirective,
                directives_1.FsFormPhoneDirective,
                directives_1.FsFormCompareDirective,
                directives_1.FsFormIntegerDirective,
                directives_1.FsFormNumericDirective,
                directives_1.FsFormPatternDirective,
                directives_1.FsFormFunctionDirective
            ],
            providers: [
                fsformcommon_service_1.FsFormCommon,
                fsform_service_1.FsForm,
                directives_1.FsFormDirective
            ],
        })
    ], FsFormModule);
    return FsFormModule;
    var FsFormModule_1;
}());
exports.FsFormModule = FsFormModule;


/***/ }),

/***/ "./index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./fs-form.module.ts"));
__export(__webpack_require__("./directives/index.ts"));
__export(__webpack_require__("./services/fsform.service.ts"));
__export(__webpack_require__("./services/fsformcommon.service.ts"));


/***/ }),

/***/ "./services/fsform.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var core_1 = __webpack_require__("@angular/core");
var Subject_1 = __webpack_require__("rxjs/Subject");
__webpack_require__("rxjs/add/operator/filter");
__webpack_require__("rxjs/add/operator/map");
var FsForm = (function () {
    function FsForm() {
        this._eventBus = new Subject_1.Subject();
    }
    FsForm.prototype.broadcast = function (key, data) {
        this._eventBus.next({ key: key, data: data });
    };
    FsForm.prototype.on = function (key) {
        return this._eventBus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; });
    };
    FsForm = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FsForm);
    return FsForm;
}());
exports.FsForm = FsForm;


/***/ }),

/***/ "./services/fsformcommon.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var core_1 = __webpack_require__("@angular/core");
var common_1 = __webpack_require__("@firestitch/common");
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
        core_1.Injectable(),
        __metadata("design:paramtypes", [common_1.FsArray, common_1.FsUtil, common_1.FsValidate])
    ], FsFormCommon);
    return FsFormCommon;
}());
exports.FsFormCommon = FsFormCommon;


/***/ }),

/***/ "@angular/common":
/***/ (function(module, exports) {

module.exports = require("@angular/common");

/***/ }),

/***/ "@angular/core":
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),

/***/ "@angular/forms":
/***/ (function(module, exports) {

module.exports = require("@angular/forms");

/***/ }),

/***/ "@firestitch/common":
/***/ (function(module, exports) {

module.exports = require("@firestitch/common");

/***/ }),

/***/ "rxjs/Subject":
/***/ (function(module, exports) {

module.exports = require("rxjs/Subject");

/***/ }),

/***/ "rxjs/add/operator/filter":
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/filter");

/***/ }),

/***/ "rxjs/add/operator/map":
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/map");

/***/ })

/******/ });
});
//# sourceMappingURL=index.map