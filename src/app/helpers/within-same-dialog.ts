import { MatDialogRef } from '@angular/material/dialog';

import type { FsFormBaseDirective } from '../directives/form-base';


/**
 * Whether an owner found through DI belongs to the same dialog as whoever found
 * it - and may therefore be joined, or driven by a button.
 *
 * A form set must never span a dialog boundary. Owners are resolved by walking
 * the element injector, and CDK parents a dialog opened with `viewContainerRef`
 * to the opener's injector, so a dialog opened from inside another dialog's form
 * would otherwise register into that form's set: the outer footer would flip to
 * Save the moment the inner dialog opened and would then submit the inner form,
 * while the inner dialog - no longer the owner of its own set - would stop
 * confirming its unsaved changes on backdrop click.
 *
 * Identity of the `MatDialogRef` is the test: everything inside one dialog
 * injects the same instance, and everything outside any dialog gets null.
 */
export function withinSameDialog(
  owner: FsFormBaseDirective,
  dialogRef: MatDialogRef<any>,
): boolean {
  return !!owner && owner.dialogRef === dialogRef;
}
