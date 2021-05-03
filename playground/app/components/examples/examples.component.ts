import { Component, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormDeactivate, FsFormDirective } from '@firestitch/form';
import { DeactivateComponent } from '../deactivate/deactivate.component';

@Component({
  templateUrl: 'examples.component.html'
})
export class ExamplesComponent implements FormDeactivate {

  public config = environment;

  @ViewChild(DeactivateComponent)
  public deactivate: DeactivateComponent;

  public getForm(): FsFormDirective  {
    return this.deactivate.form;
  }
}

