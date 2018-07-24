import { NgModule, Component, ViewChild } from '@angular/core';
import { FsMessage } from '@firestitch/message';

@Component({
  selector: 'nested-form',
  templateUrl: 'nested-form.component.html'
})
export class NestedFormComponent {

  constructor(private fsMessage: FsMessage) {}

}
