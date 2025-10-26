import { Component, inject } from '@angular/core';

import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';

import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { SubmitEvent } from './../../../../src/app/interfaces/submit-event';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { FsTabsModule } from '@firestitch/tabs';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';
import { FsFormNoFsValidatorsDirective } from '../../../../src/app/directives/validators/no-fs-validators.directive';
import { FsFormDialogActionsComponent } from '../../../../src/app/components/form-dialog-actions/form-dialog-actions.component';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';


@Component({
    templateUrl: 'dialog.component.html',
    styleUrls: ['dialog.component.scss'],
    standalone: true,
    imports: [FormsModule, FsFormDirective, FsDialogModule, MatDialogTitle, CdkScrollable, MatDialogContent, MatTabGroup, FsTabsModule, MatTab, MatFormField, MatInput, FsFormRequiredDirective, FsFormNoFsValidatorsDirective, MatDialogActions, FsFormDialogActionsComponent, MatButton, FsButtonDirective, MatDialogClose]
})
export class DialogComponent  {
  private _message = inject(FsMessage);
  private _dialogRef = inject<MatDialogRef<DialogComponent>>(MatDialogRef);


  public tab = 'tab-1';
  public account = { id: 1, name: '', email: '' };

  public save = (event: SubmitEvent) => {
    return of(this.account)
    .pipe(
      delay(1000),
      tap(response => {
        this._message.success('Saved changes');
        if (event.submitter === 'close') {
          this._dialogRef.close(response);
        }
      })
    );
  }
}
