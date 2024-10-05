import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';

import { FsFormDirective } from '../../directives/form/form.directive';


@Component({
  selector: 'fs-form-dialog-actions',
  templateUrl: './form-dialog-actions.component.html',
  styleUrls: ['./form-dialog-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsFormDialogActionsComponent implements OnInit, OnDestroy {

  @Input() public save = true;
  @Input() public create = false;
  @Input() public close = false;
  @Input() public done = false;
  @Input() public closeData = null;
  @Input() public name: string;

  public dirty = false;

  private _destroy$ = new Subject<void>();
  
  constructor(
    @Optional() private _form: FsFormDirective,
    @Optional() private _dialogRef: MatDialogRef<any>,
    private _cdRef: ChangeDetectorRef,   
  ) {}

  public ngOnInit(): void {
    if(this._form) {
      this._form.ngForm.valueChanges
        .pipe(  
          filter(() => (!this.dirty)),
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.dirty = this._form.ngForm.dirty;
          this._cdRef.markForCheck();
        });

      this._form.submitted
        .pipe(
          delay(50),
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.dirty = false;
          this._cdRef.markForCheck();
        });

      this._form.reseted
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.dirty = false;
          this._cdRef.markForCheck();
        });
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
