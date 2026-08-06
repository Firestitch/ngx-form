import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { FsButtonDirective } from '../../directives/button.directive';
import { FsFormContainerDirective } from '../../directives/form-container';
import { FsFormDialogCloseDirective } from '../../directives/form-dialog-close.directive';
import { FsFormDirective } from '../../directives/form/form.directive';


@Component({
  selector: 'fs-form-dialog-actions',
  templateUrl: './form-dialog-actions.component.html',
  styleUrls: ['./form-dialog-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    MatButton,
    FsButtonDirective,
    MatDialogClose,
    NgTemplateOutlet,
    FsFormDialogCloseDirective,
  ],
})
export class FsFormDialogActionsComponent implements OnInit, OnDestroy {

  /** Leave unset inside an `fsFormContainer` to follow whether it has anything to save. */
  @Input() public save: boolean;
  @Input() public create = false;
  @Input() public close = false;
  /** Leave unset inside an `fsFormContainer` to fill in whenever Save does not apply. */
  @Input() public done: boolean;
  @Input() public closeData = null;
  @Input() public name: string;

  public dirty = false;

  private _destroy$ = new Subject<void>();
  private _container = inject(FsFormContainerDirective, { optional: true });
  private _form = inject(FsFormDirective, { optional: true });
  private _cdRef = inject(ChangeDetectorRef);

  /**
   * Inside a container these default to whether anything mounted can actually
   * save, so a footer left as a bare `<fs-form-dialog-actions>` swaps Save for
   * Done as tabs change without the dialog listing which tabs are savable. An
   * explicit binding always wins, and outside a container Save stays on as it
   * always did.
   */
  public get showSave(): boolean {
    return this.save ?? (this._container ? this._container.submits : true);
  }

  public get showDone(): boolean {
    return this.done ?? (this._container ? !this._container.submits && !this.create : false);
  }

  public ngOnInit(): void {
    const owner = this._container || this._form?.rootForm;

    if(owner) {
      // Track the whole set, not one form's own controls: with a form scoped to a
      // tab's fields, the actions sit outside it in the dialog footer and that
      // form's NgForm holds nothing of its own. Recomputed on every emission
      // rather than latched, so a switch to a pristine tab clears it too.
      owner.dirtyChange$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.dirty = owner.dirtyLinked;
          this._cdRef.markForCheck();
        });

      owner.submitted$
        .pipe(
          delay(50),
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.dirty = false;
          this._cdRef.markForCheck();
        });
    }

    if(this._form) {
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
