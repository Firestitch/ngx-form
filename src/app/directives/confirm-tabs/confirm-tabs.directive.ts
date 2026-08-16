import { Directive, OnInit, inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';

import { withinSameDialog } from '../../helpers/within-same-dialog';
import { FsFormBaseDirective } from '../form-base';
import { FsFormContainerDirective } from '../form-container';
import { FsFormDirective } from '../form';


/**
 * Brings a tab group into the enclosing form set's unsaved-changes confirm.
 *
 * An owner picks up tab groups with `@ContentChildren(MatTabGroup)`, which reaches
 * through its own projected content - including lazily mounted tab bodies - but
 * stops at a child component's view. So a tab group declared inside a child
 * component's own template is invisible to the dialog that contains it, and
 * switching between those tabs never prompts even though switching the outer ones
 * does. That is not a shape worth avoiding: a dialog whose Profile tab is its own
 * component, with its own tabs inside, is the normal way to keep a large dialog
 * readable.
 *
 * DI does cross the boundary a content query cannot, so put this on the nested
 * group and it registers itself with the owner above it:
 *
 *   <mat-tab-group fsFormConfirmTabs [(selected)]="tab">
 *
 * Confirming stays gated on the owner's `confirm` and `confirmTabs` inputs, so
 * this only opts the group in - it never forces a prompt on.
 */
@Directive({
  selector: 'mat-tab-group[fsFormConfirmTabs]',
  standalone: true,
})
export class FsFormConfirmTabsDirective implements OnInit {

  private _tabGroup = inject(MatTabGroup, { self: true });
  private _dialogRef = inject<MatDialogRef<any>>(MatDialogRef, { optional: true });
  private _container = this._ownDialogOnly(inject(FsFormContainerDirective, { optional: true }));
  private _form = this._ownDialogOnly(inject(FsFormDirective, { optional: true }));

  public ngOnInit(): void {
    const owner = this._container || this._form?.rootForm;

    owner?.registerTabGroup(this._tabGroup);
  }

  private _ownDialogOnly<T extends FsFormBaseDirective>(owner: T): T {
    return withinSameDialog(owner, this._dialogRef) ? owner : null;
  }
}
