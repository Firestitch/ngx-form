import { Component, SkipSelf } from '@angular/core';
import { ControlContainer, NgForm, FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';

@Component({
    selector: 'nested-level-1',
    templateUrl: 'nested-level-1.component.html',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        FormsModule,
        FsFormRequiredDirective,
    ],
})
export class NestedLevel1Component {

  public name1;
}
