import { Directive, OnInit, OnChanges, Input,
     AfterViewInit, EventEmitter, ElementRef, Renderer2, forwardRef, ViewContainerRef } from '@angular/core';
import { FormGroupDirective, ControlContainer,
         FormGroup, NgForm, Validators, NgControl,
         FormControl, ValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsForm: FsForm) {

        controlRef.control.statusChanges.subscribe(res => {
            fsForm.renderErrors(this, controlRef, renderer, elRef);
        });

        controlRef.control['fsValidators'] = controlRef.control['fsValidators'] || [];
        if (!controlRef.control['fsValidatorsChange$']) {
            controlRef.control['fsValidatorsChange$'] = new BehaviorSubject<any>(null);
            controlRef.control['fsValidatorsChange$'].subscribe((validator) => {
                if (validator) {
                    controlRef.control['fsValidators'].push(validator);
                    controlRef.control.setValidators(controlRef.control['fsValidators']);
                }
            });
        }
    }

    addValidator(validator) {

    }

    removeValidator(validator) {

    }
}

@Directive({
    selector: '[fsRequired]'
})
export class FsRequiredDirective extends FsControlDirective implements OnInit, OnChanges {
    @Input() fsRequired;
    constructor(private elRef: ElementRef, private renderer: Renderer2, private controlRef: NgControl, private viewContainer: ViewContainerRef, private fsForm: FsForm) {
        super(elRef, renderer, controlRef, viewContainer, fsForm);
    }
    ngOnInit() {
        if (this.fsRequired) {
            this.controlRef.control['fsValidatorsChange$'].next(Validators.required);
        }
    }
    ngOnChanges() {
        //console.log('Required Changed', this.fsRequired);
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
        this.controlRef.control['fsValidatorsChange$'].next(Validators.max(this.fsMax));
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
        this.controlRef.control['fsValidatorsChange$'].next(Validators.min(this.fsMin));
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
