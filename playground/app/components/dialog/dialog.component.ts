import { MatTabGroup } from '@angular/material/tabs';
import { SubmitEvent } from './../../../../src/app/interfaces/submit-event';
import { Component, ViewChild } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';


@Component({
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent  {

  public tab = 'tab-1';
  public account = { id: 1, name: '', email: '' };

  public constructor(
    private _message: FsMessage,
    private _dialogRef: MatDialogRef<DialogComponent>
  ) {}

  public save = (event: SubmitEvent) => {
    return of(this.account)
    .pipe(
      delay(1000),
      tap(response => {
        this._message.success('Saved changes');
        if (event.submitter === 'close') {
          this._dialogRef.close(response);
        }
      })
    );
  }
}
