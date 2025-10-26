import { Directive } from '@angular/core';

import { FsButtonDirective } from './button.directive';


@Directive({
    selector: 'dummy-selector',
    standalone: true,
})
export class FsSubmitButtonDirective extends FsButtonDirective {
}
