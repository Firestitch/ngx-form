import { Directive, OnInit, OnChanges, Input, DoCheck, AfterViewChecked,
     AfterViewInit, EventEmitter, ElementRef, Renderer2, forwardRef, ViewContainerRef } from '@angular/core';
import { FormGroupDirective, ControlContainer,
         FormGroup, NgForm, Validators, NgControl,
         FormControl, ValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FsArray } from '@firestitch/common';
import { FsForm } from './fsform.service';
import { FsFormBroadcaster } from './fsformbroadcaster.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
    selector: '[fsControl]'
})
export class FsControlDirective implements AfterViewChecked, OnDestroy {

    @Input() fsFormRequiredMessage = 'This field is required.';
    @Input() fsFormEmailMessage = 'This is not a valid email address.';
    @Input() fsFormPhoneMessage = 'Invalid phone number.';
    @Input() fsFormNumericMessage = 'Value should be numeric.';
    @Input() fsFormIntegerMessage = 'Value should be an integer.';
    @Input() fsFormMinMessage = 'Should not be less than $(1).';
    @Input() fsFormMaxMessage = 'Should not be bigger than $(1).';
    @Input() fsFormMinlengthMessage = 'Should not be shorter than $(1) characters.';
    @Input() fsFormMaxlengthMessage = 'Should not be longer than $(1) characters.';
    @Input() fsFormCompareMessage = 'Inputs do not match.';
    @Input() fsFormPatternMessage = 'Value should match pattern $(1)';

    protected fsForm: FsForm;
    protected elRef: ElementRef;
    protected renderer: Renderer2;
    protected controlRef: NgControl;
    protected viewContainer: ViewContainerRef;

    protected statusChanges$;

    constructor(
        ElementRef: ElementRef,
        Renderer2: Renderer2,
        NgControl: NgControl,
        ViewContainerRef: ViewContainerRef,
        FsForm: FsForm) {

        this.fsForm = FsForm;
        this.elRef = ElementRef;
        this.renderer = Renderer2;
        this.controlRef = NgControl;
        this.viewContainer = ViewContainerRef;

        this.statusChanges$ = this.controlRef.control.statusChanges.subscribe(res => {
            FsForm.renderErrors(this, this.controlRef, this.renderer, this.elRef);
        });

        this.controlRef.control['fsValidators'] = this.controlRef.control['fsValidators'] || [];
        this.controlRef.control['fsAsyncValidators'] = this.controlRef.control['fsAsyncValidators'] || [];
    }

    ngOnDestroy() {
        this.statusChanges$.unsubscribe();
    }

    // If the  inputs are not visible (display: none) then don't include the input in the validation
    ngAfterViewChecked() {

        const element = this.elRef;
        // If not visible
        if ( element.nativeElement.offsetParent === null) {
            this.controlRef.control.clearValidators();
            this.controlRef.control.clearAsyncValidators();
        }else {
            // Hack. If element visible, has no validatio but exist some validation rules -
            // updating validators and triggering change event (For some reason inputs assign
            // new rules only oinit and on change events
            if (
                (this.controlRef.control['fsValidators'].length && !this.controlRef.control.validator) ||
                (this.controlRef.control['fsAsyncValidators'].length && !this.controlRef.control.asyncValidator)
            ) {

                this.updateValidators();
                setTimeout(() => {
                    this.controlRef.control.setValue(this.controlRef.control.value);
                });
            }
        }
    }

    updateValidators() {
        this.controlRef.control.setValidators(this.controlRef.control['fsValidators']);
        this.controlRef.control.setAsyncValidators(this.controlRef.control['fsAsyncValidators']);
    }

    addValidator(validator) {
        this.controlRef.control['fsValidators'].push(validator);
        this.updateValidators();
    }

    removeValidator(validator) {
        const index = this.fsForm.searchIndex(this.controlRef.control['fsValidators'], validator);

        if (index !== -1) {
            this.controlRef.control['fsValidators'].splice(index, 1);
            this.updateValidators();
        }
    }

    addAsyncValidator(validator) {
        this.controlRef.control['fsAsyncValidators'].push(validator);
        this.controlRef.control.setAsyncValidators(this.controlRef.control['fsAsyncValidators']);
    }
}

@Directive({
    selector: '[fsFormRequired]'
})
export class FsFormRequiredDirective extends FsControlDirective implements OnChanges {
    @Input() fsFormRequired: boolean;

    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }

    ngOnChanges() {
        if (this.fsFormRequired) {
            super.addValidator(Validators.required);
        }else {
            super.removeValidator(Validators.required);
        }
    }
}

@Directive({
    selector: '[fsFormMax]'
})
export class FsFormMaxDirective extends FsControlDirective implements OnInit {
    @Input() fsFormMax;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(Validators.max(this.fsFormMax));
    }
}

@Directive({
    selector: '[fsFormMin]'
})
export class FsFormMinDirective extends FsControlDirective implements OnInit {
    @Input() fsFormMin;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(Validators.min(this.fsFormMin));
    }
}

@Directive({
    selector: '[fsFormMinLength]'
})
export class FsFormMinLengthDirective extends FsControlDirective implements OnInit {
    @Input() fsFormMinLength;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(Validators.minLength(this.fsFormMinLength));
    }
}

@Directive({
    selector: '[fsFormMaxLength]'
})
export class FsFormMaxLengthDirective extends FsControlDirective implements OnInit {
    @Input() fsFormMaxLength;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(Validators.maxLength(this.fsFormMaxLength));
    }
}

@Directive({
    selector: '[fsFormEmail]'
})
export class FsFormEmailDirective extends FsControlDirective implements OnChanges {
    @Input() fsFormEmail;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnChanges() {

        const validator = () => {
            if (this.fsForm.email(this.elRef.nativeElement.value)) {
                return null;
            }
            return { email: true };
        };

        if (this.fsFormEmail) {
            super.addValidator(validator);
        }else {
            super.removeValidator(validator);
        }
    }
}

@Directive({
    selector: '[fsFormPhone]'
})
export class FsFormPhoneDirective extends FsControlDirective implements OnChanges {
    @Input() fsFormPhone;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnChanges() {

        const validator = () => {
            if (this.fsForm.phone(this.elRef.nativeElement.value)) {
                return null;
            }
            return { phone: true };
        };

        if (this.fsFormPhone) {
            super.addValidator(validator);
        }else {
            super.removeValidator(validator);
        }
    }
}

@Directive({
    selector: '[fsFormCompare]'
})
export class FsFormCompareDirective extends FsControlDirective implements OnInit {
    @Input() fsFormCompare;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(() => {
            if (this.fsFormCompare.value === this.elRef.nativeElement.value) {
                return null;
            } else {
                return { compare: true };
            }
        });
    }
}

@Directive({
    selector: '[fsFormInteger]'
})
export class FsFormIntegerDirective extends FsControlDirective implements OnInit {
    @Input() fsFormInteger;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        if (this.fsFormInteger) {
            super.addValidator((control: AbstractControl): { [key: string]: boolean } => {
                if (this.fsForm.isInt(control.value)) {
                    return null;
                } else {
                    return { integer: true }
                }
            });
        }
    }
}

@Directive({
    selector: '[fsFormNumeric]'
})
export class FsFormNumericDirective extends FsControlDirective implements OnInit {
    @Input() fsFormNumeric;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        if (this.fsFormNumeric) {
            super.addValidator((control: AbstractControl): { [key: string]: boolean } => {
                if (this.fsForm.isNumeric(control.value)) {
                    return null;
                } else {
                    return { numeric: true }
                }
            });
        }
    }
}

@Directive({
    selector: '[fsFormPattern]'
})
export class FsFormPatternDirective extends FsControlDirective implements OnInit {
    @Input() fsFormPattern: RegExp;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(Validators.pattern(this.fsFormPattern));
    }
}
/*
@Directive({
    selector: '[fsFormValidate]'
})
export class FsFormValidateDirective extends FsControlDirective implements OnInit {
    @Input() fsFormValidate;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(this.fsFormValidate);
    }
}
*/

@Directive({
    selector: '[fsFormFunction]'
})
export class FsFormFunctionDirective extends FsControlDirective implements OnInit {
    @Input() fsFormFunction;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {

        super.addAsyncValidator(() => {
            const result = this.fsFormFunction(this.controlRef);

            if (result instanceof Promise) {
                return new Promise((resolve, reject) => {
                    result.then(() => {
                        resolve(null);
                    })
                    .catch((err) => {
                        resolve({ validationError: err });
                    });
                });
            }
        });
    }
}

@Directive({
    selector: '[fsForm]'
})
export class FsFormDirective implements OnInit, OnDestroy {
    @Input() fsFormBinding: NgForm;

    constructor(
        private elRef: ElementRef,
        private vc: ViewContainerRef,
        private fsFormBroadcaster: FsFormBroadcaster
    ) { }

    ngOnInit() {

        if (this.fsFormBinding) {
            this.fsFormBinding.ngSubmit.subscribe(res => {

                this.fsFormBroadcaster.broadcast('submit', this.fsFormBinding);

                if (this.fsFormBinding.form.status === 'INVALID') {

                    this.fsFormBroadcaster.broadcast('invalid', this.fsFormBinding);

                    for (const key in this.fsFormBinding.controls) {

                        if (!this.fsFormBinding.controls[key]) {
                            continue;
                        }
                        this.fsFormBinding.controls[key].markAsDirty();
                        this.fsFormBinding.controls[key].updateValueAndValidity();
                    }
                } else {
                    this.fsFormBroadcaster.broadcast('valid', this.fsFormBinding);
                }
            })
        }
    }

    ngOnDestroy() {
        this.fsFormBinding.ngSubmit.unsubscribe();
    }
}
