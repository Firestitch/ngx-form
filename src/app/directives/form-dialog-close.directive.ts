import { Directive, HostListener, OnDestroy, HostBinding, Optional, Input } from '@angular/core';
import { FsFormDirective } from './form';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmResult } from '../enums/confirm-result';


@Directive({
  selector: '[fsFormDialogClose],[fs-form-dialog-close]'
})
export class FsFormDialogCloseDirective implements OnDestroy {

  @Input() public closeData;

  private _destroy$ = new Subject();
 
  public constructor(
    @Optional() private _form: FsFormDirective,
    @Optional() private _dialogRef: MatDialogRef<any>,
  ) {
  }

  @HostBinding('attr.type') type = 'button';

  @HostListener('click', ['$event.target'])
  public closeClick(): void {
    if(this._form) {
      this._form.triggerConfirm()
      .pipe(
        filter((confirmResult: ConfirmResult) => (confirmResult !== ConfirmResult.Review)),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._dialogRef.close(this.closeData);
      });
    } else {
      this._dialogRef.close(this.closeData);
    }
  }
 
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
