import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { delay, switchMap, tap } from 'rxjs/operators';

import { filter } from '@firestitch/common';
import { FsForm, FsFormDirective } from '@firestitch/form';
import { FsMessage } from '@firestitch/message';

import { of, throwError } from 'rxjs';


@Component({
  selector: 'first-example',
  templateUrl: './first-example.component.html',
  styleUrls: ['./first-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstExampleComponent implements OnInit {

  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  public required = true;
  public hidden = false;
  public render = true;
  public validations = true;
  public lengthInput = '';
  public datepicker = null;
  public checkbox: object[] = [];
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
    { name: 'Item 4', id: 4 }
  ];

  public selectedAccounts = [];

  public searchAccounts = query => {
    const accounts: any[] = [
      { name: 'Bob', email: 'bob@gmail.com', id: 1 },
      { name: 'Ryan', email: 'ryan@gmail.com', id: 2 },
      { name: 'Jane', email: 'jane@gmail.com', id: 3 },
      { name: 'Dave', email: 'dave@gmail.com', id: 4 }
    ];

    accounts.forEach(item => {
      item.avatar = 'https://randomuser.me/api/portraits/men/' + Math.floor((Math.random() * 99) + 1) + '.jpg';
    });

    return of(filter(accounts, item => {
      return item.email.toLowerCase().match(new RegExp(query.keyword.toLowerCase()));
    }));
  };

  constructor(private fsMessage: FsMessage, private fsForm: FsForm) {
    setTimeout(() => {
      this.skeleton = true;
    }, 2000);
  }

  public ngOnInit(): void {
    const v = of(true)
      .pipe(
        delay(3000),
        switchMap(() => throwError('bad')),
      );
    setTimeout(() => {
      this.form.registerSubmit(v);
    });
  }

  public submit() {
    this.form.ngForm.ngSubmit.next();
  }

  public fetchChips = keyword => {
    return of(this.items);
  };

  public submitting() {
    this.fsMessage.info('Submitting validation');
  }

  public save = () => {
    return of(true)
      .pipe(
        delay(2000),
        tap(() => {
          this.fsMessage.success('Validation successful');
        }),
      );
  }

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
