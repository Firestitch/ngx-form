import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { FsButtonDirective } from '../../directives/button.directive';
import { FsFormBaseDirective } from '../../directives/form-base';
import { FsFormContainerDirective } from '../../directives/form-container';
import { FsFormDialogCloseDirective } from '../../directives/form-dialog-close.directive';
import { FsFormDirective } from '../../directives/form/form.directive';
import { withinSameDialog } from '../../helpers/within-same-dialog';


@Component({
  selector: 'fs-form-dialog-actions',
  templateUrl: './form-dialog-actions.component.html',
  styleUrls: ['./form-dialog-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    'class': 'form-buttons',
    '[class.save-create]': 'showSave || create',
  },
  imports: [
    MatButton,
    FsButtonDirective,
    MatDialogClose,
    NgTemplateOutlet,
    FsFormDialogCloseDirective,
  ],
})
export class FsFormDialogActionsComponent implements OnInit, OnDestroy {

  /** Leave unset to follow whether the enclosing form or container has anything to save. */
  @Input() public save: boolean;
  @Input() public create = false;
  @Input() public close = false;
  /** Leave unset to fill in whenever Save does not apply. */
  @Input() public done: boolean;
  @Input() public closeData = null;
  @Input() public name: string;

  public dirty = false;

  private _destroy$ = new Subject<void>();
  private _dialogRef = inject<MatDialogRef<any>>(MatDialogRef, { optional: true });
  // A dialog opened with `viewContainerRef` resolves through to whatever opened
  // it, so an owner from another dialog is discarded - these actions belong to
  // their own dialog's form set and no one else's.
  private _container = this._ownDialogOnly(inject(FsFormContainerDirective, { optional: true }));
  private _form = this._ownDialogOnly(inject(FsFormDirective, { optional: true }));
  private _cdRef = inject(ChangeDetectorRef);

  /**
   * Whatever owns the form set these actions act on, or null when nothing does.
   * A container answers for every form mounted under it; failing that the
   * enclosing form's root answers for itself and anything linked into it.
   */
  private get _owner(): FsFormBaseDirective {
    return this._container || this._form?.rootForm || null;
  }

  /**
   * Save and Done are one decision - whether there is anything to save - rather
   * than two independent switches, so a bare `<fs-form-dialog-actions>` resolves
   * it off the form set it sits in and needs no bindings at all. A footer in a
   * container swaps Save for Done as tabs change without the dialog listing
   * which tabs are savable, and a dialog with no form at all - a read-only one
   * of labelled facts - gets Done, because a submit button there has nothing to
   * submit.
   *
   * An explicit binding always wins. `[done]="true"` on its own means Done and
   * only Done: turning Done on while leaving a Save beside it is never what the
   * caller meant, and the two-flag version of this let that happen silently.
   */
  public get showSave(): boolean {
    if(this.save !== undefined) {
      return this.save;
    }

    return this.done === true ? false : this._owner?.submits ?? false;
  }

  public get showDone(): boolean {
    return this.done ?? (!this.showSave && !this.create);
  }

  public ngOnInit(): void {
    const owner = this._owner;

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

  /** Keeps a DI-resolved owner only when it belongs to these actions' dialog. */
  private _ownDialogOnly<T extends FsFormBaseDirective>(owner: T): T {
    return withinSameDialog(owner, this._dialogRef) ? owner : null;
  }
}
