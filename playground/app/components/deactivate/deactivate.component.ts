import { delay, tap } from 'rxjs/operators';
import { Component, ViewChild } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { FsFormComponent } from '@firestitch/form';
import { of } from 'rxjs';


@Component({
  selector: 'deactivate',
  templateUrl: 'deactivate.component.html',
  styleUrls: [ 'deactivate.component.css' ]
})
export class DeactivateComponent {

  @ViewChild(FsFormComponent, { static: false }) public form: FsFormComponent;

  public email;

  constructor(private _message: FsMessage) {}

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
    this.form.confirm()
    .subscribe(() => {
      this._message.success('There are no changes');
    });
  }
}
