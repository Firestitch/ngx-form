import { Component } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'nested-level-2',
  templateUrl: 'nested-level-2.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class NestedLevel2Component {

  public name2;
}
