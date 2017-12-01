import { Directive, ElementRef, Input, NgModule, Renderer2, ViewContainerRef, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NgControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSliderModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsAsyncValidateDirective = (function () {
    function FsAsyncValidateDirective() {
        console.log('FsAsyncValidateDirective1');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    FsAsyncValidateDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        console.log('FsAsyncValidateDirective2', c);
        return new Promise(function (resolve) {
            console.log('FsAsyncValidateDirective 3');
            resolve({ validateEmailTaken: true });
        });
    };
    FsAsyncValidateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[asyncEmailValidator]',
                    providers: [
                        {
                            provide: NG_ASYNC_VALIDATORS,
                            useExisting: forwardRef(function () { return FsAsyncValidateDirective; }), multi: true
                        },
                    ]
                },] },
    ];
    /** @nocollapse */
    FsAsyncValidateDirective.ctorParameters = function () { return []; };
    return FsAsyncValidateDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ERROR_MESSAGES = {
    required: "This field is required.",
    email: "This is not a valid email address.",
    numeric: "Value should be numeric",
    integer: "Value should be an integer",
    min: 'Should not be less than $(1).',
    max: 'Should not be bigger than $(1).',
    minlength: 'Should not be shorter than $(1) characters.',
    maxlength: 'Should not be longer than $(1) characters.'
};
var FsInputDirective = (function () {
    function FsInputDirective(elRef, controlRef, renderer, viewContainer) {
        this.elRef = elRef;
        this.controlRef = controlRef;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.validators = [];
    }
    Object.defineProperty(FsInputDirective.prototype, "fsMax", {
        set: /**
         * @param {?} length
         * @return {?}
         */
        function (length) {
            this.validators.push(Validators.max(length));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsInputDirective.prototype, "fsMin", {
        set: /**
         * @param {?} length
         * @return {?}
         */
        function (length) {
            this.validators.push(Validators.min(length));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsInputDirective.prototype, "fsMinLength", {
        set: /**
         * @param {?} length
         * @return {?}
         */
        function (length) {
            this.validators.push(Validators.minLength(length));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsInputDirective.prototype, "fsMaxLength", {
        set: /**
         * @param {?} length
         * @return {?}
         */
        function (length) {
            this.validators.push(Validators.maxLength(length));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsInputDirective.prototype, "fsEmail", {
        set: /**
         * @param {?} length
         * @return {?}
         */
        function (length) {
            this.validators.push(Validators.email);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsInputDirective.prototype, "fsInteger", {
        set: /**
         * @param {?} apply
         * @return {?}
         */
        function (apply) {
            if (apply) {
                this.validators.push(function (control) {
                    if (!control.value || (!control.value.length || (parseInt(control.value) || control.value === '0'))) {
                        return null;
                    }
                    else {
                        return { integer: true };
                    }
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsInputDirective.prototype, "fsRequired", {
        set: /**
         * @param {?} apply
         * @return {?}
         */
        function (apply) {
            if (apply) {
                this.validators.push(Validators.required);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsInputDirective.prototype, "fsNumeric", {
        set: /**
         * @param {?} apply
         * @return {?}
         */
        function (apply) {
            if (apply) {
                this.validators.push(function (control) {
                    if (!control.value || (!control.value.length || (parseFloat(control.value) || control.value === '0'))) {
                        return null;
                    }
                    else {
                        return { numeric: true };
                    }
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsInputDirective.prototype, "fsValidatePattern", {
        set: /**
         * @param {?} pattern
         * @return {?}
         */
        function (pattern) {
            this.validators.push(Validators.pattern(pattern));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsInputDirective.prototype, "fsValidate", {
        set: /**
         * @param {?} validator
         * @return {?}
         */
        function (validator) {
            this.validators.push(validator);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsInputDirective.prototype, "fsAsyncValidate", {
        set: /**
         * @param {?} validator
         * @return {?}
         */
        function (validator) {
            this.asyncValidators = validator;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FsInputDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.controlRef.control.setValidators(this.validators);
        if (this.asyncValidators) {
            this.controlRef.control.setAsyncValidators(this.asyncValidators);
        }
        this.controlRef.control.statusChanges.subscribe(function (res) {
            _this.renderErrors();
        });
    };
    /**
     * @return {?}
     */
    FsInputDirective.prototype.renderErrors = /**
     * @return {?}
     */
    function () {
        if (this.controlRef.dirty) {
            var /** @type {?} */ errorContainer = this.renderer.createElement('div');
            this.renderer.addClass(errorContainer, 'ng-trigger');
            this.renderer.addClass(errorContainer, 'ng-trigger-transitionMessages');
            for (var /** @type {?} */ errKey in this.controlRef.errors) {
                var /** @type {?} */ errorElement = this.renderer.createElement('mat-error');
                this.renderer.addClass(errorElement, 'mat-error');
                this.renderer.setProperty(errorElement, 'id', 'mat-error-' + errKey);
                var /** @type {?} */ errorText = void 0;
                if (ERROR_MESSAGES[errKey]) {
                    errorText = this.renderer.createText(this.parseErrorMessage(ERROR_MESSAGES[errKey], this.controlRef.errors[errKey]));
                }
                else
                    errorText = this.renderer.createText(this.controlRef.errors[errKey]);
                this.renderer.appendChild(errorElement, errorText);
                this.renderer.appendChild(errorContainer, errorElement);
            }
            //searching for a container if we are at input element
            var /** @type {?} */ errorPlaceholder = this.findClass(this.elRef.nativeElement.parentNode.parentNode.parentNode, 'mat-form-field-subscript-wrapper');
            if (errorPlaceholder) {
                errorPlaceholder.innerHTML = '';
                errorPlaceholder.appendChild(errorContainer);
            }
            else {
                errorPlaceholder = this.renderer.createElement('div');
                this.renderer.addClass(errorPlaceholder, 'mat-form-field-subscript-wrapper');
                this.renderer.appendChild(errorPlaceholder, errorContainer);
                this.elRef.nativeElement.appendChild(errorPlaceholder);
            }
        }
    };
    /**
     * @param {?} message
     * @param {?} args
     * @return {?}
     */
    FsInputDirective.prototype.parseErrorMessage = /**
     * @param {?} message
     * @param {?} args
     * @return {?}
     */
    function (message, args) {
        for (var /** @type {?} */ key in args) {
            message = message.replace(/\$\(\d\)/, args[key]);
        }
        return message;
    };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    FsInputDirective.prototype.findClass = /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    function (element, className) {
        var /** @type {?} */ foundElement = null;
        /**
         * @param {?} element
         * @param {?} className
         * @param {?} found
         * @return {?}
         */
        function recurse(element, className, found) {
            for (var /** @type {?} */ i = 0; i < element.childNodes.length && !found; i++) {
                var /** @type {?} */ el = element.childNodes[i];
                var /** @type {?} */ classes = void 0;
                if (typeof el.className == 'string')
                    classes = el.className != undefined ? el.className.split(" ") : [];
                else
                    classes = [];
                for (var /** @type {?} */ j = 0, /** @type {?} */ jl = classes.length; j < jl; j++) {
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
    FsInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fs-input]'
                },] },
    ];
    /** @nocollapse */
    FsInputDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: NgControl, },
        { type: Renderer2, },
        { type: ViewContainerRef, },
    ]; };
    FsInputDirective.propDecorators = {
        "fsMax": [{ type: Input },],
        "fsMin": [{ type: Input },],
        "fsMinLength": [{ type: Input },],
        "fsMaxLength": [{ type: Input },],
        "fsEmail": [{ type: Input },],
        "fsInteger": [{ type: Input },],
        "fsRequired": [{ type: Input },],
        "fsNumeric": [{ type: Input },],
        "fsValidatePattern": [{ type: Input },],
        "fsValidate": [{ type: Input },],
        "fsAsyncValidate": [{ type: Input },],
    };
    return FsInputDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsFormDirective = (function () {
    function FsFormDirective(elRef, vc) {
        this.elRef = elRef;
        this.vc = vc;
    }
    /**
     * @return {?}
     */
    FsFormDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.fsFormBinding)
            this.fsFormBinding.ngSubmit.subscribe(function (res) {
                if (!res['valid'])
                    for (var /** @type {?} */ key in _this.fsFormBinding.controls) {
                        _this.fsFormBinding.controls[key].markAsDirty();
                        _this.fsFormBinding.controls[key].updateValueAndValidity();
                    }
            });
    };
    FsFormDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fs-form]'
                },] },
    ];
    /** @nocollapse */
    FsFormDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ViewContainerRef, },
    ]; };
    FsFormDirective.propDecorators = {
        "fsFormBinding": [{ type: Input },],
    };
    return FsFormDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsFormModule = (function () {
    function FsFormModule() {
    }
    /**
     * @return {?}
     */
    FsFormModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: FsFormModule,
            providers: [
                FsFormDirective,
                FsInputDirective,
                FsAsyncValidateDirective
            ]
        };
    };
    FsFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        MatAutocompleteModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatCardModule,
                        MatCheckboxModule,
                        MatChipsModule,
                        MatStepperModule,
                        MatDatepickerModule,
                        MatDialogModule,
                        MatExpansionModule,
                        MatGridListModule,
                        MatIconModule,
                        MatInputModule,
                        MatListModule,
                        MatMenuModule,
                        MatNativeDateModule,
                        MatPaginatorModule,
                        MatProgressBarModule,
                        MatProgressSpinnerModule,
                        MatRadioModule,
                        MatRippleModule,
                        MatSelectModule,
                        MatSidenavModule,
                        MatSliderModule,
                        MatSlideToggleModule,
                        MatSnackBarModule,
                        MatSortModule,
                        MatTableModule,
                        MatTabsModule,
                        MatToolbarModule,
                        MatTooltipModule,
                        FlexLayoutModule
                        //MATERIAL END
                    ],
                    declarations: [
                        FsFormDirective,
                        FsInputDirective,
                        FsAsyncValidateDirective
                    ],
                    providers: [
                        FsFormDirective,
                        FsInputDirective,
                        FsAsyncValidateDirective
                    ],
                    exports: [
                        FsFormDirective,
                        FsInputDirective,
                        FsAsyncValidateDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    FsFormModule.ctorParameters = function () { return []; };
    return FsFormModule;
}());

export { FsFormModule, FsAsyncValidateDirective, FsInputDirective, FsFormDirective };
