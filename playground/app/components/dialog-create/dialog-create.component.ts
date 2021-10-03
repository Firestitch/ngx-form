import { MatTabGroup } from '@angular/material/tabs';
import { SubmitEvent } from '../../../../src/app/interfaces/submit-event';
import { Component, ViewChild } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';


@Component({
  templateUrl: 'dialog-create.component.html',
  styleUrls: ['dialog-create.component.scss']
})
export class DialogCreateComponent  {

  public tab = 'first';
  public animal = { id: null, name: '', color: '' };

  public constructor(
    private _message: FsMessage,
    private _dialogRef: MatDialogRef<DialogCreateComponent>
  ) {}

  public save = (event: SubmitEvent) => {
    return of(this.animal)
    .pipe(
      delay(1000),
      tap((response) => {
        this._message.success('Saved changes');
        this._dialogRef.close(response);
      })
    );
  }
}
