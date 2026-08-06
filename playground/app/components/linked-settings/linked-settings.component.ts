import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import { FsMessage } from '@firestitch/message';

import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { FsFormEmailDirective } from '../../../../src/app/directives/validators/email.directive';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';


@Component({
  selector: 'app-linked-settings',
  templateUrl: './linked-settings.component.html',
  styleUrls: ['./linked-settings.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    FsFormDirective,
    FsFormRequiredDirective,
    FsFormEmailDirective,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatSlideToggle,
  ],
})
export class LinkedSettingsComponent {

  @Input() public account;

  public statuses = ['Active', 'Pending', 'Suspended'];

  private _message = inject(FsMessage);

  public save = () => {
    return of(this.account)
      .pipe(
        delay(600),
        tap(() => this._message.success('Saved settings')),
      );
  };

  public saveInstantly(field: string): void {
    of(this.account)
      .pipe(
        delay(300),
        tap(() => this._message.success(`${field} saved`)),
      )
      .subscribe();
  }
}
