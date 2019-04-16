import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';

@Component({
  selector: 'non-material',
  styleUrls: ['non-material.component.scss'],
  templateUrl: 'non-material.component.html'
})
export class NonMaterialComponent {

  public phone1;
  public phone2;
  constructor(private fsMessage: FsMessage) {}


  save() {
    this.fsMessage.success('Validation successful');
  }
}
