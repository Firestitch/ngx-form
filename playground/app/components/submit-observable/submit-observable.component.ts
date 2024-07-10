import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsMessage } from '@firestitch/message';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'submit-observable',
  templateUrl: './submit-observable.component.html',
  styleUrls: ['./submit-observable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
