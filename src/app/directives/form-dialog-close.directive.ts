import { Directive, HostBinding, HostListener, Input, OnDestroy, inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ConfirmResult } from '../enums/confirm-result';

import { FsFormDirective } from './form';


@Directive({
    selector: '[fsFormDialogClose],[fs-form-dialog-close]',
    standalone: true,
})
export class FsFormDialogCloseDirective implements OnDestroy {
  private _form = inject(FsFormDirective, { optional: true });
  private _dialogRef = inject<MatDialogRef<any>>(MatDialogRef, { optional: true });


  @Input() public closeData;

  @HostBinding('attr.type') public type = 'button';

  private _destroy$ = new Subject();

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
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
