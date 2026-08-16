import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatTab, MatTabContent, MatTabGroup } from '@angular/material/tabs';

import { FsDialogModule } from '@firestitch/dialog';
import { FsTabsModule } from '@firestitch/tabs';

import { FsFormDialogActionsComponent } from '../../../../src/app/components/form-dialog-actions/form-dialog-actions.component';
import { FsFormContainerDirective } from '../../../../src/app/directives/form-container/form-container.directive';
import { LinkedProfileComponent } from '../linked-profile/linked-profile.component';


@Component({
  templateUrl: './dialog-linked.component.html',
  styleUrls: ['./dialog-linked.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    FsFormContainerDirective,
    FsDialogModule,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatTabGroup,
    MatTab,
    MatTabContent,
    FsTabsModule,
    FsFormDialogActionsComponent,
    LinkedProfileComponent,
  ],
})
export class DialogLinkedComponent {

  public sideTab = 'profile';

  public account = {
    id: 1,
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    note: '',
    status: 'Active',
    notify: true,
  };
}
