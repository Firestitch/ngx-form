import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { MatDialogRef } from '@angular/material';
import { FormDialog } from '@firestitch/form';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FsPrompt } from '@firestitch/prompt';

@Component({
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent extends FormDialog {

  public animal = {};

  constructor(private _message: FsMessage,
              private _dialogRef: MatDialogRef<DialogComponent>,
              private _prompt: FsPrompt) {
    super(_dialogRef, _prompt);
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
