import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';


import { filter } from '@firestitch/common';
import { FsFormDirective } from '@firestitch/form';
import { FsMessage } from '@firestitch/message';

import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';


@Component({
  selector: 'first-example',
  templateUrl: './first-example.component.html',
  styleUrls: ['./first-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstExampleComponent {

  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  public required = true;
  public hidden = false;
  public render = true;
  public validations = true;
  public lengthInput = '';
  public datepicker = null;
  public checkbox: any[] = [];
  public password = null;
  public passwordConfirm = null;
  public emails = null;
  public phone = null;
  public url = null;
  public numeric = null;
  public daterange = null;
  public startDate = null;
  public endDate = null;
  public pattern = null;
  public email = null;
  public integer = null;
  public chips = [];
  public minMaxInput = null;
  public radioRequired = null;
  public skeleton;
  public greaterInput;
  public model: any = {};
  public disabled = false;
  public maxLengthInput;
  public minLengthInput;

  public items = [
    { name: 'Item 1', id: 1 },
    { name: 'Item 2', id: 2 },
    { name: 'Item 3', id: 3 },
    { name: 'Item 4', id: 4 },
  ];

  public selectedAccounts = [];

  constructor(
    private _message: FsMessage,
  ) {
    setTimeout(() => {
      this.skeleton = true;
    }, 2000);
  }

  public searchAccounts = (query) => {
    const accounts: any[] = [
      { name: 'Bob', email: 'bob@gmail.com', id: 1 },
      { name: 'Ryan', email: 'ryan@gmail.com', id: 2 },
      { name: 'Jane', email: 'jane@gmail.com', id: 3 },
      { name: 'Dave', email: 'dave@gmail.com', id: 4 },
    ];

    accounts.forEach((item) => {
      item.avatar = `https://randomuser.me/api/portraits/men/${Math.floor((Math.random() * 99) + 1)}.jpg`;
    });

    return of(filter(accounts, (item) => {
      return item.email.toLowerCase().match(new RegExp(query.keyword.toLowerCase()));
    }));
  };

  public submit() {
    this.form.ngForm.ngSubmit.next(null);
  }

  public fetchChips = () => {
    return of(this.items);
  };

  public submitting() {
    this._message.info('Submitting validation');
  }

  public save = () => {
    return of(true)
      .pipe(
        delay(3000),
        tap(() => {
          this._message.success('Validation successful');
        }),
      );
  };

  public toggleDisable() {
    this.disabled = !this.disabled;

    if (this.disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public invalid() {
    console.log('Validation invalid');
  }

  public reset() {
    this.form.reset();
  }

  public clear() {
    this.form.clear();
  }

  public createSnapshot() {
    this.form.createSnapshot();
  }

  public dirty() {
    this.form.dirty();
  }
}
