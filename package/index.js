(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("rxjs/Subject"), require("rxjs/add/operator/filter"), require("rxjs/add/operator/map"), require("@angular/forms"));
	else if(typeof define === 'function' && define.amd)
		define("@firestitch/form", ["@angular/core", "@angular/common", "rxjs/Subject", "rxjs/add/operator/filter", "rxjs/add/operator/map", "@angular/forms"], factory);
	else if(typeof exports === 'object')
		exports["@firestitch/form"] = factory(require("@angular/core"), require("@angular/common"), require("rxjs/Subject"), require("rxjs/add/operator/filter"), require("rxjs/add/operator/map"), require("@angular/forms"));
	else
		root["@firestitch/form"] = factory(root["@angular/core"], root["@angular/common"], root["rxjs/Subject"], root["rxjs/add/operator/filter"], root["rxjs/add/operator/map"], root["@angular/forms"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__angular_core__, __WEBPACK_EXTERNAL_MODULE__angular_common__, __WEBPACK_EXTERNAL_MODULE_rxjs_Subject__, __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_filter__, __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_map__, __WEBPACK_EXTERNAL_MODULE__angular_forms__) {
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

/***/ "../node_modules/@firestitch/common/package/index.js":
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__("@angular/core"), __webpack_require__("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define("@firestitch/common", ["@angular/core", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["@firestitch/common"] = factory(require("@angular/core"), require("@angular/common"));
	else
		root["@firestitch/common"] = factory(root["@angular/core"], root["@angular/common"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__angular_core__, __WEBPACK_EXTERNAL_MODULE__angular_common__) {
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

/***/ "./fs-common.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var common_1 = __webpack_require__("@angular/common");
var fsarray_service_1 = __webpack_require__("./services/fsarray.service.ts");
var fsmath_service_1 = __webpack_require__("./services/fsmath.service.ts");
var fsutil_service_1 = __webpack_require__("./services/fsutil.service.ts");
var fsvaildate_service_1 = __webpack_require__("./services/fsvaildate.service.ts");
var fsutil_pipe_1 = __webpack_require__("./services/fsutil.pipe.ts");
var FsCommonModule = (function () {
    function FsCommonModule() {
    }
    FsCommonModule_1 = FsCommonModule;
    FsCommonModule.forRoot = function () {
        return {
            ngModule: FsCommonModule_1,
            providers: [
                fsarray_service_1.FsArray,
                fsmath_service_1.FsMath,
                fsutil_service_1.FsUtil,
                fsvaildate_service_1.FsValidate
            ]
        };
    };
    FsCommonModule = FsCommonModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
            ],
            exports: [
                fsutil_pipe_1.FsUtilGuidPipe,
                fsutil_pipe_1.FsUtilStringifyPipe
            ],
            entryComponents: [],
            declarations: [
                fsutil_pipe_1.FsUtilGuidPipe,
                fsutil_pipe_1.FsUtilStringifyPipe
            ],
            providers: [
                fsarray_service_1.FsArray,
                fsmath_service_1.FsMath,
                fsutil_service_1.FsUtil,
                fsvaildate_service_1.FsValidate
            ]
        })
    ], FsCommonModule);
    return FsCommonModule;
    var FsCommonModule_1;
}());
exports.FsCommonModule = FsCommonModule;


/***/ }),

/***/ "./index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./fs-common.module.ts"));
__export(__webpack_require__("./services/fsarray.service.ts"));
__export(__webpack_require__("./services/fsmath.service.ts"));
__export(__webpack_require__("./services/fsutil.pipe.ts"));
__export(__webpack_require__("./services/fsutil.service.ts"));
__export(__webpack_require__("./services/fsvaildate.service.ts"));


/***/ }),

/***/ "./services/fsarray.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var FsArray = (function () {
    function FsArray() {
    }
    FsArray.prototype.nameValue = function (array, name, value) {
        var list = [];
        if (name || value) {
            var nameFn_1 = typeof name === 'function' ? name : function (item) { return item[name]; };
            var valueFn_1 = typeof value === 'function' ? value : function (item) { return item[value]; };
            array.forEach(function (item) {
                list.push({ name: nameFn_1(item), value: valueFn_1(item) });
            });
        }
        else {
            array.forEach(function (name, value) {
                list.push({ name: name, value: value });
            });
        }
        return list;
    };
    FsArray.prototype.remove = function (array, query) {
        var idx = this.indexOf(array, query);
        if (idx >= 0) {
            return array.splice(idx, 1);
        }
        return idx;
    };
    FsArray.prototype.indexOf = function (array, query) {
        var _this = this;
        if (typeof query !== 'function') {
            var queryObj_1 = query;
            query = function (item) {
                return _this.compare(queryObj_1, item);
            };
        }
        for (var i = 0, len = array.length; i < len; i++) {
            if (query(array[i])) {
                return i;
            }
        }
        return -1;
    };
    FsArray.prototype.compare = function (query, item) {
        var value = true;
        for (var key in query) {
            value = value && item[key] == query[key];
        }
        return value;
    };
    FsArray.prototype.filter = function (array, query) {
        var _this = this;
        if (typeof query !== 'function') {
            var queryObj_2 = query;
            query = function (item) {
                return _this.compare(queryObj_2, item);
            };
        }
        var isarray = Array.isArray(array);
        var list = isarray ? [] : {};
        if (isarray)
            array.forEach(function (item, idx) {
                if (query(item)) {
                    list.push(item);
                }
            });
        else
            Object.keys(array).forEach(function (key) {
                if (query(array[key])) {
                    list[key] = array[key];
                }
            });
        return list;
    };
    FsArray.prototype.index = function (array, property) {
        var list = {};
        array.forEach(function (item, idx) {
            list[item[property]] = item;
        });
        return list;
    };
    FsArray.prototype.sort = function (array, query, reverse) {
        if (reverse === void 0) { reverse = false; }
        if (typeof query !== 'function') {
            var queryStr_1 = query;
            query = function (a, b) {
                if (reverse) {
                    if (a[queryStr_1] < b[queryStr_1]) {
                        return 1;
                    }
                    else if (a[queryStr_1] > b[queryStr_1]) {
                        return -1;
                    }
                }
                else {
                    if (a[queryStr_1] > b[queryStr_1]) {
                        return 1;
                    }
                    else if (a[queryStr_1] < b[queryStr_1]) {
                        return -1;
                    }
                }
                return 0;
            };
        }
        array.sort(query);
        return array;
    };
    FsArray.prototype.rsort = function (array, query) {
        return this.sort(array, query, true);
    };
    FsArray.prototype.list = function (array, property, index) {
        if (index === void 0) { index = null; }
        var list = index ? {} : [];
        array.forEach(function (item, idx) {
            if (index) {
                list[item[index]] = item[property];
            }
            else {
                list.push(item[property]);
            }
        });
        return list;
    };
    FsArray.prototype.applyDepth = function (objects, parent_property, id_property, depth_property) {
        if (id_property === void 0) { id_property = 'id'; }
        if (depth_property === void 0) { depth_property = 'depth'; }
        var keyed = {};
        objects.forEach(function (object) {
            if (!object[parent_property])
                object[depth_property] = 0;
            keyed[object[id_property]] = object;
        });
        Object.keys(keyed).forEach(function (key) {
            Object.keys(keyed).forEach(function (key) {
                var object = keyed[key];
                if (!keyed[key][depth_property]) {
                    if (keyed[key][parent_property]) {
                        keyed[key][depth_property] = keyed[keyed[key][parent_property]][depth_property] + 1;
                    }
                }
            });
        });
        return keyed;
    };
    FsArray.prototype.inArray = function (values, array) {
        if (!Array.isArray(values)) {
            values = [values];
        }
        for (var i = 0, len = values.length; i < len; i++) {
            if (array.indexOf(values[i]) >= 0) {
                return true;
            }
        }
        return false;
    };
    FsArray.prototype.keyExists = function (array, key) {
        return array.hasOwnProperty(key);
    };
    FsArray.prototype.length = function (array) {
        return array.length;
    };
    FsArray.prototype.ksort = function (unordered) {
        Object.keys(unordered).sort().forEach(function (key) {
            var value = unordered[key];
            delete unordered[key];
            unordered[key] = value;
        });
    };
    FsArray = __decorate([
        core_1.Injectable()
    ], FsArray);
    return FsArray;
}());
exports.FsArray = FsArray;


/***/ }),

/***/ "./services/fsmath.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var FsMath = (function () {
    function FsMath() {
    }
    FsMath.prototype.round = function (number, precision) {
        precision = precision || 0;
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };
    FsMath = __decorate([
        core_1.Injectable()
    ], FsMath);
    return FsMath;
}());
exports.FsMath = FsMath;


/***/ }),

/***/ "./services/fsutil.pipe.ts":
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
var fsutil_service_1 = __webpack_require__("./services/fsutil.service.ts");
var FsUtilStringifyPipe = (function () {
    function FsUtilStringifyPipe(FsUtil) {
        this.FsUtil = FsUtil;
    }
    FsUtilStringifyPipe.prototype.transform = function (value) {
        return this.FsUtil.stringify(value);
    };
    FsUtilStringifyPipe = __decorate([
        core_1.Pipe({
            name: 'fsUtilStringify'
        }),
        __metadata("design:paramtypes", [fsutil_service_1.FsUtil])
    ], FsUtilStringifyPipe);
    return FsUtilStringifyPipe;
}());
exports.FsUtilStringifyPipe = FsUtilStringifyPipe;
var FsUtilGuidPipe = (function () {
    function FsUtilGuidPipe(FsUtil) {
        this.FsUtil = FsUtil;
    }
    FsUtilGuidPipe.prototype.transform = function () {
        return this.FsUtil.guid();
    };
    FsUtilGuidPipe = __decorate([
        core_1.Pipe({
            name: 'fsUtilGuid'
        }),
        __metadata("design:paramtypes", [fsutil_service_1.FsUtil])
    ], FsUtilGuidPipe);
    return FsUtilGuidPipe;
}());
exports.FsUtilGuidPipe = FsUtilGuidPipe;


/***/ }),

/***/ "./services/fsutil.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
exports.KEY_CANCEL = 3, exports.KEY_HELP = 6, exports.KEY_BACKSPACE = 8, exports.KEY_TAB = 9, exports.KEY_CLEAR = 12, exports.KEY_RETURN = 13, exports.KEY_ENTER = 14, exports.KEY_SHIFT = 16, exports.KEY_CONTROL = 17, exports.KEY_ALT = 18, exports.KEY_PAUSE = 19, exports.KEY_CAPS_LOCK = 20, exports.KEY_ESCAPE = 27, exports.KEY_SPACE = 32, exports.KEY_PAGE_UP = 33, exports.KEY_PAGE_DOWN = 34, exports.KEY_END = 35, exports.KEY_HOME = 36, exports.KEY_LEFT = 37, exports.KEY_UP = 38, exports.KEY_RIGHT = 39, exports.KEY_DOWN = 40, exports.KEY_PRINTSCREEN = 44, exports.KEY_INSERT = 45, exports.KEY_DELETE = 46, exports.KEY_0 = 48, exports.KEY_1 = 49, exports.KEY_2 = 50, exports.KEY_3 = 51, exports.KEY_4 = 52, exports.KEY_5 = 53, exports.KEY_6 = 54, exports.KEY_7 = 55, exports.KEY_8 = 56, exports.KEY_9 = 57, exports.KEY_SEMICOLON = 59, exports.KEY_EQUALS = 61;
/*
    Basically, just copy-pasted functionality from fs-boilerplate v1.x, with some small changes (like we dont have angular.bind anymore, had to go with a workaround)
    There might be a better way to organise constatns but I need to know use-cases
*/
var FsUtil = (function () {
    function FsUtil() {
        this.intervals = {};
    }
    FsUtil.prototype.guid = function (pattern) {
        pattern = pattern || 'xxxxxx';
        return pattern.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    FsUtil.prototype.uuid = function () {
        return this.guid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    };
    FsUtil.prototype.resolve = function (promise, defaults) {
        if (defaults === void 0) { defaults = []; }
        var result = defaults;
        return new Promise(function (resolve) {
            promise.then(function (data) {
                Object.keys(data).forEach(function (key) { return result[key] = data[key]; });
                resolve(result);
            });
        });
    };
    FsUtil.prototype.int = function (value) {
        value = parseInt(value);
        if (isNaN(value)) {
            value = 0;
        }
        return value;
    };
    FsUtil.prototype.float = function (value) {
        value = parseFloat(value);
        if (isNaN(value)) {
            value = 0;
        }
        return value;
    };
    FsUtil.prototype.string = function (string) {
        if (string === null || string === undefined) {
            string = '';
        }
        return (string).toString();
    };
    FsUtil.prototype.isEmpty = function (value, options) {
        options = options || {};
        return value === undefined ||
            value === null ||
            value === false ||
            value === '' ||
            !this.string(value).length ||
            (this.isObject(value) &&
                (value.constructor.name === 'Object' && !Object.keys(value).length)) ||
            (!options.zero && (value === 0 || value === '0'));
    };
    FsUtil.prototype.isInt = function (value, type) {
        var int = !!this.string(value).match(/^\d+$/);
        if (!int) {
            return false;
        }
        if (type) {
            return Number.isInteger(value);
        }
        return true;
    };
    FsUtil.prototype.each = function (object, func) {
        if (!this.isArray(object) && !this.isObject(object)) {
            return;
        }
        Object.keys(object).forEach(function (key) {
            func(object[key], key);
        });
    };
    FsUtil.prototype.isObject = function (value) {
        return value !== null && typeof value === 'object' && !this.isArray(value);
    };
    FsUtil.prototype.isString = function (value) {
        return typeof value === 'string' || value instanceof String;
    };
    FsUtil.prototype.isArray = function (value) {
        return value instanceof Array;
    };
    FsUtil.prototype.isNumeric = function (value) {
        return this.string(value).length && !!this.string(value).match(/^-?\d*\.?\d*$/);
    };
    FsUtil.prototype.isClass = function (value, cls) {
        if (this.isObject(value)) {
            if (this.isString(cls)) {
                if (value.constructor) {
                    if (value.constructor.name === cls) {
                        return true;
                    }
                }
            }
            else {
                if (value instanceof cls) {
                    return true;
                }
            }
        }
        return false;
    };
    FsUtil.prototype.isBoolean = function (value) {
        return value === true || value === false;
    };
    FsUtil.prototype.value = function (object, key, def) {
        if (this.isObject(object) || this.isArray(object)) {
            if (object.hasOwnProperty(key)) {
                return object[key];
            }
        }
        return def;
    };
    FsUtil.prototype.interval = function (fn, delay, name) {
        var instance = setInterval(fn, delay);
        if (name) {
            this.intervals[name] = instance;
        }
        return function () {
            window.clearInterval(instance);
        };
    };
    FsUtil.prototype.clearInterval = function (name) {
        var instance = this.intervals[name];
        if (instance) {
            window.clearInterval(instance);
        }
    };
    FsUtil.prototype.throttle = function (func, wait) {
        var waiting = false; // Initially, we're not waiting
        return function () {
            if (!waiting) {
                func.apply(null, arguments); // Execute users function
                waiting = true; // Prevent future invocations
                setTimeout(function () {
                    waiting = false; // And allow future invocations
                }, wait);
            }
        };
    };
    FsUtil.prototype.debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args);
        };
    };
    FsUtil.prototype.length = function (object) {
        if (this.isObject(object)) {
            return Object.keys(object).length;
        }
        if (this.isArray(object)) {
            return object.length;
        }
        return 0;
    };
    FsUtil.prototype.boolean = function (value) {
        return this.string(value).toLowerCase() !== 'false' && !!value;
    };
    FsUtil.prototype.stringify = function (value) {
        return JSON.stringify(value);
    };
    FsUtil = __decorate([
        core_1.Injectable()
    ], FsUtil);
    return FsUtil;
}());
exports.FsUtil = FsUtil;


/***/ }),

/***/ "./services/fsvaildate.service.ts":
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
var fsutil_service_1 = __webpack_require__("./services/fsutil.service.ts");
var FsValidate = (function () {
    function FsValidate(fsUtil) {
        this.fsUtil = fsUtil;
    }
    FsValidate.prototype.phone = function (value) {
        var valid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value);
        return valid || !String(value).length;
    };
    FsValidate.prototype.email = function (value) {
        return !!this.fsUtil.string(value).match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    FsValidate = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [fsutil_service_1.FsUtil])
    ], FsValidate);
    return FsValidate;
}());
exports.FsValidate = FsValidate;


/***/ }),

/***/ "@angular/common":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_common__;

/***/ }),

/***/ "@angular/core":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_core__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.map

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
var common_1 = __webpack_require__("../node_modules/@firestitch/common/package/index.js");
var fsformcommon_service_1 = __webpack_require__("./services/fsformcommon.service.ts");
var fsform_service_1 = __webpack_require__("./services/fsform.service.ts");
var core_1 = __webpack_require__("@angular/core");
var common_2 = __webpack_require__("@angular/common");
var fsform_directive_1 = __webpack_require__("./fsform.directive.ts");
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


/***/ }),

/***/ "./fsform.directive.ts":
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
var fsformcommon_service_1 = __webpack_require__("./services/fsformcommon.service.ts");
var fsform_service_1 = __webpack_require__("./services/fsform.service.ts");
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


/***/ }),

/***/ "./index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./fs-form.module.ts"));
__export(__webpack_require__("./fsform.directive.ts"));
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
var common_1 = __webpack_require__("../node_modules/@firestitch/common/package/index.js");
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
            var elContainer = elRef.nativeElement.tagName === 'FS-CHECKBOX-GROUP' ?
                elRef.nativeElement : elRef.nativeElement.parentNode.parentNode.parentNode;
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

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_common__;

/***/ }),

/***/ "@angular/core":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_core__;

/***/ }),

/***/ "@angular/forms":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_forms__;

/***/ }),

/***/ "rxjs/Subject":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_Subject__;

/***/ }),

/***/ "rxjs/add/operator/filter":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_filter__;

/***/ }),

/***/ "rxjs/add/operator/map":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_map__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.map