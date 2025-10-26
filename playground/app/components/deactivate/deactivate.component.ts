import { delay, tap } from 'rxjs/operators';
import { Component, ViewChild, inject } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { FsFormDirective } from '@firestitch/form';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FsFormDirective as FsFormDirective_1 } from '../../../../src/app/directives/form/form.directive';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormEmailDirective } from '../../../../src/app/directives/validators/email.directive';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';
import { MatButton, MatAnchor } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';
import { FsTabsModule } from '@firestitch/tabs';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'deactivate',
    templateUrl: 'deactivate.component.html',
    styleUrls: ['deactivate.component.css'],
    standalone: true,
    imports: [FormsModule, FsFormDirective_1, MatFormField, MatInput, FsFormEmailDirective, FsFormRequiredDirective, MatButton, FsButtonDirective, MatAnchor, FsTabsModule, RouterLink]
})
export class DeactivateComponent {
  private _message = inject(FsMessage);


  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  public email = 'bob@email.com';
  public email1 = 'ray@email.com';

  submit = () => {
    return of(true)
    .pipe(
      delay(1000),
      tap(() => {
        this._message.success('Validation successful');
      })
    );
  }

  confirm() {
    this.form.triggerConfirm()
    .subscribe(() => {
      this._message.success('There are no changes');
    });
  }
}
