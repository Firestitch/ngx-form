import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsMessage } from '@firestitch/message';

import { of, throwError } from 'rxjs';

@Component({
  selector: 'function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunctionComponent {

  public email = 'email@email.com';
  public models: any = {};

  constructor(
    private _message: FsMessage,
  ) { }

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
