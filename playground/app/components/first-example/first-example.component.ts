import { NgModule, Component } from '@angular/core';
import { FsForm } from './../../../../src';
import { FsMessage } from '@firestitch/message';

import { Observable } from 'rxjs/Observable';


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
