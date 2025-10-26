import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';
import { NgTemplateOutlet } from '@angular/common';
import { NestedLevel1Component } from '../nested-level-1/nested-level-1.component';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';

@Component({
    selector: 'nested',
    templateUrl: 'nested.component.html',
    styleUrls: ['nested.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormDirective,
        MatFormField,
        MatInput,
        FsFormRequiredDirective,
        NgTemplateOutlet,
        NestedLevel1Component,
        MatButton,
        FsButtonDirective,
    ],
})
export class NestedComponent {

  public firstname;
  public email;
  public show = false;

  constructor(
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
  ) {
  }

  public save() {
    this._message.success('Successfully submitted');
  }
}

