import { Component } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { FsForm } from '@firestitch/form';
import { filter } from '@firestitch/common';

import { of } from 'rxjs';


@Component({
  selector: 'first-example',
  templateUrl: 'first-example.component.html',
  styleUrls: [ 'first-example.component.css' ]
})
export class FirstExampleComponent {

  public required = true;
  public hidden = false;
  public render = true;
  public lengthInput = '';
  public datepicker = null;
  public checkbox: object[] = [];
  public password = null;
  public passwordConfirm = null;
  public emails = null;
  public phone = null;
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
    },2000)
  }

  public fetchChips = keyword => {
    return of(this.items);
  };

  submitting() {
    this.fsMessage.info('Submitting validation', { mode: 'toast' });
  }

  save() {
    this.fsMessage.success('Validation successful');
  }

  invalid() {
    this.fsMessage.error('Validation invalid', { mode: 'toast' });
  }

}
