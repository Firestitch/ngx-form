import { Component, SkipSelf } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'nested-level-1',
  templateUrl: 'nested-level-1.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class NestedLevel1Component {

  public name;
}
