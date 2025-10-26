import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsMessage } from '@firestitch/message';

import { tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';
import { FsFormNoFsValidatorsDirective } from '../../../../src/app/directives/validators/no-fs-validators.directive';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';

@Component({
    selector: 'submit-observable',
    templateUrl: './submit-observable.component.html',
    styleUrls: ['./submit-observable.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormDirective,
        MatFormField,
        MatInput,
        FsFormRequiredDirective,
        FsFormNoFsValidatorsDirective,
        MatSuffix,
        MatButton,
        FsButtonDirective,
    ],
})
export class SubmitObservableComponent {

  public required = 'required';
  public delay = 1000;
  
  private _status;

  constructor(
    private _message: FsMessage,
    private _api: FsApi,
  ) {}

  public submit = () => {
    const data: any = {
      sleep: this.delay / 1000,
    };

    if (!this._status) {
      data.exception = 'Failed Request';
    }

    return this._api.post('https://specify.firestitch.dev/api/dummy', data)
      .pipe(
        tap(() => {
          this._message.success('Validation successful');
        }),
      );
  };

  public status(status) {
    this._status = status;
  }
}
