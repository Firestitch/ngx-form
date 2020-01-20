import { Component, AfterViewInit } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { MatDialogRef } from '@angular/material';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent  {

  public animal = { name: '', color: '' };

  constructor(private _message: FsMessage,
              private _dialogRef: MatDialogRef<DialogComponent>) {
  }

  public save = () => {
    return of(this.animal)
    .pipe(
      tap(response => {
        this._message.success('Saved changes');
        this._dialogRef.close(response);
      })
    );
  }
}
