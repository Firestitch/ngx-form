import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FsMessage } from '@firestitch/message';

import { of, throwError } from 'rxjs';
import { FsFormGroupDirective } from '../../../../src/app/directives/form-group/form-group.directive';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormValidateDirective } from '../../../../src/app/directives/validators/validate.directive';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';

@Component({
    selector: 'function',
    templateUrl: './function.component.html',
    styleUrls: ['./function.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsFormGroupDirective,
        FormsModule,
        FsFormDirective,
        MatFormField,
        MatInput,
        FsFormValidateDirective,
        MatHint,
        MatButton,
        FsButtonDirective,
    ],
})
export class FunctionComponent {
  private _message = inject(FsMessage);


  public email = 'email@email.com';
  public models: any = {};

  public validatePromise = (formControl) => {
    return new Promise((resolve, reject) => {
      if (formControl.value !== this.email) {
        reject(new Error(`Email should match ${this.email}`));
      }

      resolve(true);
    });
  };

  public validateObservable = (formControl) => {
    if (formControl.value !== this.email) {
      return throwError(() => `Email should match ${this.email}`);
    }

    return of(true);
  };

  public validateException = (formControl) => {
    if (formControl.value !== this.email) {
      throw new Error(`Email should match ${this.email}`);
    }
  };

  public save() {
    this._message.success('Validation successful');
  }
}
