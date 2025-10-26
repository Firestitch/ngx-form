import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';
import { FsFormMinDirective } from '../../../../src/app/directives/validators/min.directive';
import { FsFormMaxDirective } from '../../../../src/app/directives/validators/max.directive';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';

@Component({
    selector: 'emit-example',
    templateUrl: './emit-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormDirective,
        MatFormField,
        MatInput,
        FsFormRequiredDirective,
        FsFormMinDirective,
        FsFormMaxDirective,
        MatButton,
        FsButtonDirective,
    ],
})
export class EmitExampleComponent {
  
  @ViewChild('form') public form;

  public status = 'Not Submitted';
  public minMaxInput = null;
  public required = null;

  public submitting() {
    this.status = 'Submitting...';
  }

  public save() {
    this.status = 'Valid';
  }

  public invalid() {
    this.status = 'Invalid';
  }

  public emitSubmit() {
    this.form.ngSubmit.emit();
  }

}
