import { MatTabGroup } from '@angular/material/tabs';
import { SubmitEvent } from '../../../../src/app/interfaces/submit-event';
import { Component, ViewChild } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';


@Component({
  templateUrl: 'dialog-save.component.html',
  styleUrls: ['dialog-save.component.scss']
})
export class DialogSaveComponent  {

  public account = { id: 1, name: 'John Doe', email: 'john@email.com' };

  public constructor(
    private _message: FsMessage,
    private _dialogRef: MatDialogRef<DialogSaveComponent>
  ) {}

  public save = (event: SubmitEvent) => {
    return of(this.account)
    .pipe(
      delay(1000),
      tap((response) => {
        this._message.success('Saved changes');
        this._dialogRef.close(response);
      })
    );
  }
}
