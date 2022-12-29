import { Directive } from '@angular/core';

import { FsButtonDirective } from './button.directive';


@Directive({
  selector: 'dummy-selector',
})
export class FsSubmitButtonDirective extends FsButtonDirective {
}
