import { OnInit, ElementRef, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
export declare class FsFormDirective implements OnInit {
    private elRef;
    private vc;
    fsFormBinding: NgForm;
    constructor(elRef: ElementRef, vc: ViewContainerRef);
    ngOnInit(): void;
}
