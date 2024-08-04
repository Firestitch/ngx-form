import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';


@Component({
  templateUrl: './confirm-unsaved.component.html',
  styleUrls: ['./confirm-unsaved.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmUnsavedComponent implements OnInit, OnDestroy {

  public saveLabel;
  public discardLabel;
  public cancelLabel;
  public message;
  public title;

  private _destroy$ = new Subject<void>();
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _dialogRef: MatDialogRef<ConfirmUnsavedComponent>,
  ) {}

  public ngOnInit(): void {
    this.saveLabel = this._data.saveLabel;
    this.discardLabel = this._data.discardLabel;
    this.cancelLabel = this._data.cancelLabel;
    this.message = this._data.message;
    this.title = this._data.title;
  }

  public save(): void {
    this._dialogRef.close('save');
  }

  public discard(): void {
    this._dialogRef.close('discard');
  }

  public cancel(): void {
    this._dialogRef.close(null);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
