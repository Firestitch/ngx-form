import { MatTabGroup } from '@angular/material/tabs';
import { SubmitEvent } from '../../../../src/app/interfaces/submit-event';
import { Component, ViewChild, inject } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';
import { FsFormNoFsValidatorsDirective } from '../../../../src/app/directives/validators/no-fs-validators.directive';
import { FsFormDialogActionsComponent } from '../../../../src/app/components/form-dialog-actions/form-dialog-actions.component';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';


@Component({
    templateUrl: 'dialog-save.component.html',
    styleUrls: ['dialog-save.component.scss'],
    standalone: true,
    imports: [FormsModule, FsFormDirective, FsDialogModule, MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatInput, FsFormRequiredDirective, FsFormNoFsValidatorsDirective, MatDialogActions, FsFormDialogActionsComponent, MatButton, FsButtonDirective]
})
export class DialogSaveComponent  {
  private _message = inject(FsMessage);
  private _dialogRef = inject<MatDialogRef<DialogSaveComponent>>(MatDialogRef);


  public account = { id: 1, name: 'John Doe', email: 'john@email.com' };

  public save = (event: SubmitEvent) => {
    return of(this.account)
    .pipe(
      delay(1000),
      tap((response) => {
        this._message.success('Saved changes');
        this._dialogRef.close(response);
      })
    );
  }
}
