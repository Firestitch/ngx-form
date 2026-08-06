import { Component, OnDestroy, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsButtonDirective } from '../../../../src/app/directives/button.directive';
import { DialogLinkedComponent } from '../dialog-linked/dialog-linked.component';


@Component({
  selector: 'linked-example',
  templateUrl: './linked-example.component.html',
  standalone: true,
  imports: [
    MatButton,
    FsButtonDirective,
  ],
})
export class LinkedExampleComponent implements OnDestroy {

  private _dialog = inject(MatDialog);
  private _destroy$ = new Subject();

  public open(): void {
    this._dialog.open(DialogLinkedComponent, { width: '1000px' })
      .afterClosed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
