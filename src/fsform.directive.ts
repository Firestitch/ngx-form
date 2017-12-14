import { Directive, OnInit, OnChanges, Input,
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
export class FsControlDirective {

    @Input() fsRequiredMessage = 'This field is required.';
    @Input() fsEmailMessage = 'This is not a valid email address.';
    @Input() fsNumericMessage = 'Value should be numeric.';
    @Input() fsIntegerMessage = 'Value should be an integer.';
    @Input() fsMinMessage = 'Should not be less than $(1).';
    @Input() fsMaxMessage = 'Should not be bigger than $(1).';
    @Input() fsMinlengthMessage = 'Should not be shorter than $(1) characters.';
    @Input() fsMaxlengthMessage = 'Should not be longer than $(1) characters.';
    @Input() fsCompareMessage = 'Inputs do not match.';
    @Input() fsPatternMessage = 'Value should match pattern $(1)';

    formService: FsForm;

    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {

        this.formService = fsForm;

        controlRef.control.statusChanges.subscribe(res => {
            fsForm.renderErrors(this, controlRef, renderer, elRef);
        });

        controlRef.control['fsValidators'] = controlRef.control['fsValidators'] || [];
        controlRef.control['fsAsyncValidators'] = controlRef.control['fsAsyncValidators'] || [];
    }

    updateValidators(controlRef: NgControl) {
        if (controlRef.control['fsValidators'].length) {
            controlRef.control.setValidators(controlRef.control['fsValidators']);
        }else {
            controlRef.control.clearValidators();
        }
    }

    addValidator(controlRef: NgControl, validator) {
        controlRef.control['fsValidators'].push(validator);
        this.updateValidators(controlRef);
    }

    removeValidator(controlRef: NgControl, validator) {
        const index = this.formService.searchIndex(controlRef.control['fsValidators'], validator);

        if (index !== -1) {
            controlRef.control['fsValidators'].splice(index, 1);
            this.updateValidators(controlRef);
        }
    }

    addAsyncValidator(controlRef: NgControl, validator) {
        controlRef.control['fsAsyncValidators'].push(validator);
        controlRef.control.setAsyncValidators(controlRef.control['fsAsyncValidators']);
    }
}

@Directive({
    selector: '[fsRequired]'
})
export class FsRequiredDirective extends FsControlDirective implements OnChanges {
    @Input() fsRequired: boolean;

    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }

    ngOnChanges() {
        if (this.fsRequired) {
            super.addValidator(this.controlRef, Validators.required);
        }else {
            super.removeValidator(this.controlRef, Validators.required);
        }
    }
}

@Directive({
    selector: '[fsMax]'
})
export class FsMaxDirective extends FsControlDirective implements OnInit {
    @Input() fsMax;
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(this.controlRef, Validators.max(this.fsMax));
    }
}

@Directive({
    selector: '[fsMin]'
})
export class FsMinDirective extends FsControlDirective implements OnInit {
    @Input() fsMin;
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(this.controlRef, Validators.min(this.fsMin));
    }
}

@Directive({
    selector: '[fsMinLength]'
})
export class FsMinLengthDirective extends FsControlDirective implements OnInit {
    @Input() fsMinLength;
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(this.controlRef, Validators.minLength(this.fsMinLength));
    }
}

@Directive({
    selector: '[fsMaxLength]'
})
export class FsMaxLengthDirective extends FsControlDirective implements OnInit {
    @Input() fsMaxLength;
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(this.controlRef, Validators.maxLength(this.fsMaxLength));
    }
}

@Directive({
    selector: '[fsEmail]'
})
export class FsEmailDirective extends FsControlDirective implements OnChanges {
    @Input() fsEmail;
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnChanges() {
        if (this.fsEmail) {
            super.addValidator(this.controlRef, Validators.email);
        }else {
            super.removeValidator(this.controlRef, Validators.email);
        }
    }
}

@Directive({
    selector: '[fsCompare]'
})
export class FsCompareDirective extends FsControlDirective implements OnInit {
    @Input() fsCompare;
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(this.controlRef, () => {
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
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        if (this.fsInteger) {
            super.addValidator(this.controlRef, (control: AbstractControl): { [key: string]: boolean } => {
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
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        if (this.fsNumeric) {
            super.addValidator(this.controlRef, (control: AbstractControl): { [key: string]: boolean } => {
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
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(this.controlRef, Validators.pattern(this.fsPattern));
    }
}

@Directive({
    selector: '[fsValidate]'
})
export class FsValidateDirective extends FsControlDirective implements OnInit {
    @Input() fsValidate;
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addValidator(this.controlRef, this.fsValidate);
    }
}

@Directive({
    selector: '[fsAsyncValidate]'
})
export class FsAsyncValidateDirective extends FsControlDirective implements OnInit {
    @Input() fsAsyncValidate: Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        super.addAsyncValidator(this.controlRef, this.fsAsyncValidate);
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
        console.log(this.fsFormBinding);

        if (this.fsFormBinding) {
            this.fsFormBinding.ngSubmit.subscribe(res => {

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
