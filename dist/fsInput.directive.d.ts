import { Observable } from 'rxjs/Observable';
import { OnInit, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';
import { NgControl, ValidatorFn, ValidationErrors } from '@angular/forms';
export declare class FsInputDirective implements OnInit {
    private elRef;
    private controlRef;
    private renderer;
    private viewContainer;
    validators: ValidatorFn[];
    asyncValidators: any;
    fsMax: number;
    fsMin: number;
    fsMinLength: number;
    fsMaxLength: number;
    fsEmail: number;
    fsInteger: boolean;
    fsRequired: boolean;
    fsNumeric: boolean;
    fsValidatePattern: RegExp;
    fsValidate: any;
    fsAsyncValidate: Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
    constructor(elRef: ElementRef, controlRef: NgControl, renderer: Renderer2, viewContainer: ViewContainerRef);
    ngOnInit(): void;
    renderErrors(): void;
    parseErrorMessage(message: any, args: any): string;
    findClass(element: any, className: any): any;
}
