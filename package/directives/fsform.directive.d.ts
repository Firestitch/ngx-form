import { OnInit, ElementRef, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FsForm } from './../services/fsform.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
export declare class FsFormDirective implements OnInit, OnDestroy {
    private elRef;
    private vc;
    private fsForm;
    fsFormBinding: NgForm;
    constructor(elRef: ElementRef, vc: ViewContainerRef, fsForm: FsForm);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
