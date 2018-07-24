import { NgModule, Component, ViewChild } from '@angular/core';
import { FsMessage } from '@firestitch/message';

@Component({
  selector: 'nested',
  templateUrl: 'nested.component.html',
  styleUrls: ['nested.component.scss']
})
export class NestedComponent {

  constructor(private fsMessage: FsMessage) {}

  save() {
    this.fsMessage.success('Successfully submitted');
  }
}

