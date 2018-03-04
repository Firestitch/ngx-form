import { Directive, OnChanges, Input, AfterViewChecked,
         ElementRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FsFormCommon } from './../services/fsformcommon.service';
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

 @Input() fsFormErrorsOrder = [];

 protected fsFormCommon: FsFormCommon;
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
     FsFormCommon: FsFormCommon) {

     this.fsFormCommon = FsFormCommon;
     this.elRef = ElementRef;
     this.renderer = Renderer2;
     this.controlRef = NgControl;
     this.viewContainer = ViewContainerRef;

     this.statusChanges$ = this.controlRef.control.statusChanges.subscribe(res => {
         FsFormCommon.renderErrors(this, this.controlRef, this.renderer, this.elRef);
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
     const index = this.fsFormCommon.searchIndex(this.controlRef.control['fsValidators'], validator);

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
