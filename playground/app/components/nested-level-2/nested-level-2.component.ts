import { Component } from '@angular/core';
import { ControlContainer, NgForm, FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';

@Component({
    selector: 'nested-level-2',
    templateUrl: 'nested-level-2.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
    standalone: true,
    imports: [MatFormField, MatInput, FormsModule, FsFormRequiredDirective]
})
export class NestedLevel2Component {

  public name2;
}
