import { Directive, OnInit, OnChanges, Input, DoCheck, AfterViewChecked,
     AfterViewInit, EventEmitter, ElementRef, Renderer2, forwardRef, ViewContainerRef } from '@angular/core';
import { FormGroupDirective, ControlContainer,
         FormGroup, NgForm, Validators, NgControl,
         FormControl, ValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FsArray } from '@firestitch/common';
import { FsForm } from './fsform.service';

@Directive({
    selector: '[fsControl]'
})
export class FsControlDirective implements AfterViewChecked {

    @Input() fsRequiredMessage = 'This field is required.';
    @Input() fsEmailMessage = 'This is not a valid email address.';
    @Input() fsPhoneMessage = 'Invalid phone number.';
    @Input() fsNumericMessage = 'Value should be numeric.';
    @Input() fsIntegerMessage = 'Value should be an integer.';
    @Input() fsMinMessage = 'Should not be less than $(1).';
    @Input() fsMaxMessage = 'Should not be bigger than $(1).';
    @Input() fsMinlengthMessage = 'Should not be shorter than $(1) characters.';
    @Input() fsMaxlengthMessage = 'Should not be longer than $(1) characters.';
    @Input() fsCompareMessage = 'Inputs do not match.';
    @Input() fsPatternMessage = 'Value should match pattern $(1)';

    protected fsForm: FsForm;
    protected elRef: ElementRef;
    protected renderer: Renderer2;
    protected controlRef: NgControl;
    protected viewContainer: ViewContainerRef;

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

        this.controlRef.control.statusChanges.subscribe(res => {
            FsForm.renderErrors(this, this.controlRef, this.renderer, this.elRef);
        });

        this.controlRef.control['fsValidators'] = this.controlRef.control['fsValidators'] || [];
        this.controlRef.control['fsAsyncValidators'] = this.controlRef.control['fsAsyncValidators'] || [];
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
    selector: '[fsRequired]'
})
export class FsRequiredDirective extends FsControlDirective implements OnChanges {
    @Input() fsRequired: boolean;

    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }

    ngOnChanges() {
        if (this.fsRequired) {
            super.addValidator(Validators.required);
        }else {
            super.removeValidator(Validators.required);
        }
    }
}

@Directive({
    selector: '[fsMax]'
})
export class FsMaxDirective extends FsControlDirective implements OnInit {
    @Input() fsMax;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(Validators.max(this.fsMax));
    }
}

@Directive({
    selector: '[fsMin]'
})
export class FsMinDirective extends FsControlDirective implements OnInit {
    @Input() fsMin;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(Validators.min(this.fsMin));
    }
}

@Directive({
    selector: '[fsMinLength]'
})
export class FsMinLengthDirective extends FsControlDirective implements OnInit {
    @Input() fsMinLength;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(Validators.minLength(this.fsMinLength));
    }
}

@Directive({
    selector: '[fsMaxLength]'
})
export class FsMaxLengthDirective extends FsControlDirective implements OnInit {
    @Input() fsMaxLength;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(Validators.maxLength(this.fsMaxLength));
    }
}

@Directive({
    selector: '[fsEmail]'
})
export class FsEmailDirective extends FsControlDirective implements OnChanges {
    @Input() fsEmail;
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

        if (this.fsEmail) {
            super.addValidator(validator);
        }else {
            super.removeValidator(validator);
        }
    }
}

@Directive({
    selector: '[fsPhone]'
})
export class FsPhoneDirective extends FsControlDirective implements OnChanges {
    @Input() fsPhone;
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

        if (this.fsPhone) {
            super.addValidator(validator);
        }else {
            super.removeValidator(validator);
        }
    }
}

@Directive({
    selector: '[fsCompare]'
})
export class FsCompareDirective extends FsControlDirective implements OnInit {
    @Input() fsCompare;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(() => {
            if (this.fsCompare.value === this.elRef.nativeElement.value) {
                return null;
            } else {
                return { compare: true };
            }
        });
    }
}

@Directive({
    selector: '[fsInteger]'
})
export class FsIntegerDirective extends FsControlDirective implements OnInit {
    @Input() fsInteger;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        if (this.fsInteger) {
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
    selector: '[fsNumeric]'
})
export class FsNumericDirective extends FsControlDirective implements OnInit {
    @Input() fsNumeric;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        if (this.fsNumeric) {
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
    selector: '[fsPattern]'
})
export class FsPatternDirective extends FsControlDirective implements OnInit {
    @Input() fsPattern: RegExp;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(Validators.pattern(this.fsPattern));
    }
}

@Directive({
    selector: '[fsValidate]'
})
export class FsValidateDirective extends FsControlDirective implements OnInit {
    @Input() fsValidate;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(this.fsValidate);
    }
}

@Directive({
    selector: '[fsAsyncValidate]'
})
export class FsAsyncValidateDirective extends FsControlDirective implements OnInit {
    @Input() fsAsyncValidate: Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addAsyncValidator(this.fsAsyncValidate);
    }
}

@Directive({
    selector: '[fsForm]'
})
export class FsFormDirective implements OnInit {
    @Input() fsFormBinding: NgForm;

    constructor(
        private elRef: ElementRef,
        private vc: ViewContainerRef
    ) { }

    ngOnInit() {
        // console.log(this.fsFormBinding);

        if (this.fsFormBinding) {
            this.fsFormBinding.ngSubmit.subscribe(res => {

                // console.log(this.fsFormBinding);
                /*
                for (let key in this.fsFormBinding.form.controls) {

                    if(!this.fsFormBinding.form.controls[key]) {
                        return;
                    }

                    const element = this.elRef.nativeElement.elements.namedItem(key);

                    if(element.offsetParent === null) {
                        this.fsFormBinding.form.controls[key].clearValidators();
                        this.fsFormBinding.form.controls[key].clearAsyncValidators();
                    }
                }
                */

                if (this.fsFormBinding.form.status === 'INVALID') {
                    for (const key in this.fsFormBinding.controls) {

                        if (!this.fsFormBinding.controls[key]) {
                            continue;
                        }
                        this.fsFormBinding.controls[key].markAsDirty();
                        this.fsFormBinding.controls[key].updateValueAndValidity();
                    }
                }
            })
        }
    }
}
