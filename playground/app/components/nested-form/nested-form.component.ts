import { Component } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'nested-form',
  templateUrl: 'nested-form.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class NestedFormComponent {
}
