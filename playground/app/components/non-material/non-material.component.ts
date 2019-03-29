import { Component, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { FsMessage } from '@firestitch/message';

@Component({
  selector: 'non-material',
  templateUrl: 'non-material.component.html'
})
export class NonMaterialComponent {

  public phone;
  constructor(private fsMessage: FsMessage) {}


  save() {
    this.fsMessage.success('Validation successful');
  }
}
