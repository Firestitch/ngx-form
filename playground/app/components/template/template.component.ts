import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';
import { FsFormTemplateOutletDirective } from '../../../../src/app/directives/form-template-outlet.directive';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';
import { FsFormTemplateDirective } from '../../../../src/app/directives/form-template.directive';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormDirective,
        MatFormField,
        MatInput,
        FsFormRequiredDirective,
        FsFormTemplateOutletDirective,
        MatButton,
        FsButtonDirective,
        FsFormTemplateDirective,
        MatLabel,
    ],
})
export class TemplateComponent {
  private _message = inject(FsMessage);
  private _cdRef = inject(ChangeDetectorRef);


  public firstname;
  public email;
  public show = false;

  public save() {
    this._message.success('Successfully submitted');
  }
}

