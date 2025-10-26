import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';
import { FsFormPhoneDirective } from '../../../../src/app/directives/validators/phone.directive';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';

@Component({
    selector: 'non-material',
    styleUrls: ['non-material.component.scss'],
    templateUrl: 'non-material.component.html',
    standalone: true,
    imports: [FormsModule, FsFormDirective, FsFormRequiredDirective, FsFormPhoneDirective, MatButton, FsButtonDirective]
})
export class NonMaterialComponent {

  public phone1;
  public phone2;
  constructor(private fsMessage: FsMessage) {}


  save() {
    this.fsMessage.success('Validation successful');
  }
}
