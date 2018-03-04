import { OnInit, OnChanges, AfterViewChecked, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';
import { FsFormCommon } from './services/fsformcommon.service';
import { FsForm } from './services/fsform.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
export declare class FsControlDirective implements AfterViewChecked, OnDestroy {
    fsFormRequiredMessage: string;
    fsFormEmailMessage: string;
    fsFormPhoneMessage: string;
    fsFormNumericMessage: string;
    fsFormIntegerMessage: string;
    fsFormMinMessage: string;
    fsFormMaxMessage: string;
    fsFormMinlengthMessage: string;
    fsFormMaxlengthMessage: string;
    fsFormCompareMessage: string;
    fsFormPatternMessage: string;
    fsFormErrorsOrder: any[];
    protected fsFormCommon: FsFormCommon;
    protected elRef: ElementRef;
    protected renderer: Renderer2;
    protected controlRef: NgControl;
    protected viewContainer: ViewContainerRef;
    protected statusChanges$: any;
    constructor(ElementRef: ElementRef, Renderer2: Renderer2, NgControl: NgControl, ViewContainerRef: ViewContainerRef, FsFormCommon: FsFormCommon);
    ngOnDestroy(): void;
    ngAfterViewChecked(): void;
    updateValidators(): void;
    addValidator(validator: any): void;
    removeValidator(validator: any): void;
    addAsyncValidator(validator: any): void;
}
export declare class FsFormRequiredDirective extends FsControlDirective implements OnChanges {
    fsFormRequired: boolean;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnChanges(): void;
}
export declare class FsFormMaxDirective extends FsControlDirective implements OnInit {
    fsFormMax: any;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnInit(): void;
}
export declare class FsFormMinDirective extends FsControlDirective implements OnInit {
    fsFormMin: any;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnInit(): void;
}
export declare class FsFormMinLengthDirective extends FsControlDirective implements OnInit {
    fsFormMinLength: any;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnInit(): void;
}
export declare class FsFormMaxLengthDirective extends FsControlDirective implements OnInit {
    fsFormMaxLength: any;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnInit(): void;
}
export declare class FsFormEmailDirective extends FsControlDirective implements OnChanges {
    fsFormEmail: any;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnChanges(): void;
}
export declare class FsFormPhoneDirective extends FsControlDirective implements OnChanges {
    fsFormPhone: any;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnChanges(): void;
}
export declare class FsFormCompareDirective extends FsControlDirective implements OnInit {
    fsFormCompare: any;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnInit(): void;
}
export declare class FsFormIntegerDirective extends FsControlDirective implements OnInit {
    fsFormInteger: any;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnInit(): void;
}
export declare class FsFormNumericDirective extends FsControlDirective implements OnInit {
    fsFormNumeric: any;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnInit(): void;
}
export declare class FsFormPatternDirective extends FsControlDirective implements OnInit {
    fsFormPattern: RegExp;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnInit(): void;
}
export declare class FsFormFunctionDirective extends FsControlDirective implements OnInit {
    fsFormFunction: any;
    constructor(elRef: ElementRef, renderer: Renderer2, controlRef: NgControl, viewContainer: ViewContainerRef, fsFormCommon: FsFormCommon);
    ngOnInit(): void;
}
export declare class FsFormDirective implements OnInit, OnDestroy {
    private elRef;
    private vc;
    private fsForm;
    fsFormBinding: NgForm;
    constructor(elRef: ElementRef, vc: ViewContainerRef, fsForm: FsForm);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
