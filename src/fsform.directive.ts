import { Directive, OnInit, Input, AfterViewInit, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroupDirective, ControlContainer, FormGroup, NgForm, Validators } from '@angular/forms';

/*
    TODO:
    1) sync validators:
    1.1) parse inputs from the form and create validators like this: 
    this.fsFormBinding.controls['email'].setValidators([Validators.required, Validators.email]);
    1.2) add error messages in template like this:
    <mat-error *ngIf="email.invalid">{{getErrorMessage()}}</mat-error>
    2) async validators (figure out how to add errors on submit
    3) add main form errors on submit click (like "Please correct all the errors above")
    4) add an ability to write custom error messages with variables (like "New pattern error, invalid $(parrern)")
*/
@Directive({
    selector: '[fs-form]'
})
export class FsFormDirective implements OnInit {
    @Input() fsFormBinding: NgForm;
    constructor(
        private elRef: ElementRef,
        private vc: ViewContainerRef
    ) {
    }

    ngOnInit() {
        if (this.fsFormBinding)
            this.fsFormBinding.ngSubmit.subscribe(res => {
                if (!res['valid'])
                    for (const key in this.fsFormBinding.controls) {
                        this.fsFormBinding.controls[key].markAsDirty();
                        this.fsFormBinding.controls[key].updateValueAndValidity();
                    }
            })

    }

}