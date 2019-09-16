import { Component, ViewChild } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { of, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { FsApi } from '@firestitch/api';

@Component({
  selector: 'submit-observable',
  templateUrl: 'submit-observable.component.html',
  styleUrls: ['submit-observable.component.scss']
})
export class SubmitObservableComponent {

  public required = 'required';
  public delay = 1000;
  private _status;

  constructor(private _message: FsMessage,
              private _api: FsApi) {}

  public submit = (form) => {

    const data: any = {
      sleep: this.delay / 1000
    }

    if (!this._status) {
      data.exception = 'Failed Request';
    }

    return this._api.post('https://boilerplate.firestitch.com/api/dummy', data)
    .pipe(
      tap((response) => {
        this._message.success('Validation successful');
      })
    );
  }

  public status(status) {
    this._status = status;
  }
}
