import { Component, OnInit, ChangeDetectionStrategy, Input, Optional, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';

import { FsFormDirective } from '../../directives/form/form.directive';


@Component({
  selector: 'fs-form-dialog-actions',
  templateUrl: './form-dialog-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form-dialog-actions.component.scss'],
})
export class FsFormDialogActionsComponent implements OnInit, OnDestroy {

  @Input() public save = true;
  @Input() public create = false;
  @Input() public close = false;
  @Input() public name: string;

  public dirty = false;

  private _destroy$ = new Subject<void>();
  
  constructor(
    @Optional() private _form: FsFormDirective,
    private _cdRef: ChangeDetectorRef,   
  ) {}

  public ngOnInit(): void {
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
  }
  
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
