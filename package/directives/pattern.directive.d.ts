import { OnInit } from '@angular/core';
import { FsControlDirective } from './fscontrol.directive';
export declare class FsFormPatternDirective extends FsControlDirective implements OnInit {
    fsFormPattern: RegExp;
    ngOnInit(): void;
}
