import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dialog-example',
  templateUrl: 'dialog-example.component.html'
})
export class DialogExampleComponent implements OnDestroy{

  public response;

  private _destroy$ = new Subject();

  public constructor(private _dialog: MatDialog) {  }

  public open() {
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

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
