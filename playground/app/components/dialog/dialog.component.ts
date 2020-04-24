import { MatTabGroup } from '@angular/material/tabs';
import { SubmitEvent } from './../../../../src/app/interfaces/submit-event';
import { Component, ViewChild } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent  {

  public selectedIndex = 0;

  public animal = { name: '', color: '' };

  constructor(private _message: FsMessage,
              private _dialogRef: MatDialogRef<DialogComponent>) {
  }

  public selectedIndexChange(index) {
    this.selectedIndex = index;
  }

  public save = (event: SubmitEvent) => {
    return of(this.animal)
    .pipe(
      tap(response => {
        this._message.success('Saved changes');
        if (event.submitter === 'close') {
          this._dialogRef.close(response);
        }
      })
    );
  }
}
