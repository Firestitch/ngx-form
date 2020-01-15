import { Component, ViewChild } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { FsFormComponent } from '@firestitch/form';


@Component({
  selector: 'deactivate',
  templateUrl: 'deactivate.component.html',
  styleUrls: [ 'deactivate.component.css' ]
})
export class DeactivateComponent {

  @ViewChild(FsFormComponent, { static: false }) public form: FsFormComponent;

  constructor(private fsMessage: FsMessage) {}

  submit = () => {
    this.fsMessage.success('Validation successful');
  }
}
