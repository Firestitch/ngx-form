import { Component, ViewChild } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { FsFormComponent, FormCanDeactivate } from '@firestitch/form';


@Component({
  templateUrl: 'deactivate.component.html',
  styleUrls: [ 'deactivate.component.css' ]
})
export class DeactivateComponent implements FormCanDeactivate {

  @ViewChild(FsFormComponent, { static: false }) public form: FsFormComponent;

  constructor(private fsMessage: FsMessage) {}

  submit = () => {
    this.fsMessage.success('Validation successful');
  }

  get formComponent() {
    return this.form;
  }
}
