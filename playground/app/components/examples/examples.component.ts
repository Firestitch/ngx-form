import { Component, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormDeactivate } from '@firestitch/form';
import { DeactivateComponent } from '../deactivate/deactivate.component';

@Component({
  templateUrl: 'examples.component.html'
})
export class ExamplesComponent implements FormDeactivate {
  public config = environment;

  @ViewChild(DeactivateComponent, { static: false }) public deactivate: DeactivateComponent;

  get formDeactivateComponent() {
    return this.deactivate.form;
  }
}

