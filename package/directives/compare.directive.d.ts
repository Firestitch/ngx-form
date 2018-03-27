import { OnInit, OnDestroy } from '@angular/core';
import { FsControlDirective } from './fscontrol.directive';
export declare class FsFormCompareDirective extends FsControlDirective implements OnInit, OnDestroy {
    fsFormCompare: any;
    validator: () => {
        compare: boolean;
    };
    ngOnInit(): void;
    ngOnDestroy(): void;
}
