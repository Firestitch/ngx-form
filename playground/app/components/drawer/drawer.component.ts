import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { of, Subject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { DrawerRef } from '@firestitch/drawer';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormNoFsValidatorsDirective } from '../../../../src/app/directives/validators/no-fs-validators.directive';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';


@Component({
    templateUrl: 'drawer.component.html',
    styleUrls: ['drawer.component.scss'],
    standalone: true,
    imports: [FormsModule, FsFormDirective, MatFormField, MatInput, FsFormNoFsValidatorsDirective, MatButton, FsButtonDirective]
})
export class DrawerComponent  {

  public animal = { name: '', color: '' };

  constructor(private _message: FsMessage,
              private _dialogRef: DrawerRef<DrawerComponent>) {}

  public close() {
  }

  public save = () => {
    return of(this.animal)
      .pipe(
        delay(200),
        tap(() => {
          this._message.success('Saved changes');
        })
    );
  }
}
