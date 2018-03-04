import { Directive, OnInit, OnChanges, Input, DoCheck, AfterViewChecked,
     AfterViewInit, EventEmitter, ElementRef, Renderer2, forwardRef, ViewContainerRef } from '@angular/core';
import { FormGroupDirective, ControlContainer,
         FormGroup, NgForm, Validators, NgControl,
         FormControl, ValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FsArray } from '@firestitch/common';
import { FsFormCommon } from './../services/fsformcommon.service';
import { FsForm } from './../services/fsform.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
    selector: '[fsForm]'
})
export class FsFormDirective implements OnInit, OnDestroy {
    @Input() fsFormBinding: NgForm;

    constructor(
        private elRef: ElementRef,
        private vc: ViewContainerRef,
        private fsForm: FsForm
    ) { }

    ngOnInit() {

        if (this.fsFormBinding) {
            this.fsFormBinding.ngSubmit.subscribe(res => {

                this.fsForm.broadcast('submit', this.fsFormBinding);

                if (this.fsFormBinding.form.status === 'INVALID') {

                    this.fsForm.broadcast('invalid', this.fsFormBinding);

                    for (const key in this.fsFormBinding.controls) {

                        if (!this.fsFormBinding.controls[key]) {
                            continue;
                        }
                        this.fsFormBinding.controls[key].markAsDirty();
                        this.fsFormBinding.controls[key].updateValueAndValidity();
                    }
                } else {
                    this.fsForm.broadcast('valid', this.fsFormBinding);
                }
            })
        }
    }

    ngOnDestroy() {
        this.fsFormBinding.ngSubmit.unsubscribe();
    }
}
