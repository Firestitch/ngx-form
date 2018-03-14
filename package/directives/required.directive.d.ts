import { OnChanges } from '@angular/core';
import { FsControlDirective } from './fscontrol.directive';
export declare class FsFormRequiredDirective extends FsControlDirective implements OnChanges {
    fsFormRequired: boolean;
    ngOnChanges(): void;
}
