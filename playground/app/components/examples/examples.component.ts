import { Component, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormDeactivate } from '@firestitch/form';
import { DeactivateComponent } from '../deactivate/deactivate.component';

@Component({
  templateUrl: 'examples.component.html'
})
export class ExamplesComponent {
  public config = environment;

  @ViewChild(DeactivateComponent) public deactivate: DeactivateComponent;

  get formComponent() {
    return this.deactivate.form;
  }
}

