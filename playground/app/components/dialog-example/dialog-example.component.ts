import { Component, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import { DialogSaveComponent } from '../dialog-save/dialog-save.component';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'dialog-example',
  templateUrl: 'dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss'],
})
export class DialogExampleComponent implements OnDestroy{

  public response;

  private _destroy$ = new Subject();

  public constructor(private _dialog: MatDialog) {  }

  public openTabs() {
    this.response = null;
    this._dialog.open(DialogComponent)
    .afterClosed()
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(reseponse => {
      this.response = reseponse;
    });
  }

  public openCreate() {
    this.response = null;
    this._dialog.open(DialogCreateComponent)
    .afterClosed()
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(reseponse => {
      this.response = reseponse;
    });
  }

  public openSave() {
    this.response = null;
    this._dialog.open(DialogSaveComponent)
    .afterClosed()
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(reseponse => {
      this.response = reseponse;
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
