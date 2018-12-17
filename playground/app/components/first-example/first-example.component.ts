import { NgModule, Component } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { filter } from '@firestitch/common/array';

import { Observable } from 'rxjs/Observable';

import { FsForm } from './../../../../src';


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
  public chips = [];

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

    return Observable.of(filter(accounts, item => {
      return item.email.toLowerCase().match(new RegExp(query.keyword.toLowerCase()));
    }));
  }

  constructor(private fsMessage: FsMessage, private fsForm: FsForm) {}

  public fetchChips = keyword => {
    return Observable.of(this.items);
  }

  submitting() {
    this.fsMessage.info('Submitting validation', { mode: 'toast' });
  }

  save() {
    this.fsMessage.success('Validation successful');
  }

  invalid(form) {
    this.fsMessage.error('Validation invalid', { mode: 'toast' });
  }

}
