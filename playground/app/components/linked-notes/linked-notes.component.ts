import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { FsMessage } from '@firestitch/message';

import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';


@Component({
  selector: 'app-linked-notes',
  templateUrl: './linked-notes.component.html',
  styleUrls: ['./linked-notes.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    FsFormDirective,
    FsFormRequiredDirective,
    MatFormField,
    MatLabel,
    MatInput,
  ],
})
export class LinkedNotesComponent {

  @Input() public account;

  private _message = inject(FsMessage);

  public save = () => {
    return of(this.account)
      .pipe(
        delay(600),
        tap(() => this._message.success('Saved note')),
      );
  };
}
