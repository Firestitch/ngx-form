import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { environment } from '../../../environments/environment';
import { DeactivateComponent } from '../deactivate/deactivate.component';


@Component({
  templateUrl: './examples.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesComponent {

  public config = environment;

  @ViewChild(DeactivateComponent)
  public deactivate: DeactivateComponent;

}

