import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { FsDialogModule } from '@firestitch/dialog';

import { Subject } from 'rxjs';


@Component({
  templateUrl: './confirm-unsaved.component.html',
  styleUrls: ['./confirm-unsaved.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButton,

    FsDialogModule,
  ],
})
export class ConfirmUnsavedComponent implements OnInit, OnDestroy {
  private _data = inject(MAT_DIALOG_DATA);
  private _dialogRef = inject<MatDialogRef<ConfirmUnsavedComponent>>(MatDialogRef);


  public saveLabel;
  public discardLabel;
  public cancelLabel;
  public message;
  public title;

  private _destroy$ = new Subject<void>();

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
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
