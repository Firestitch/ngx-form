import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MatTab, MatTabContent, MatTabGroup } from '@angular/material/tabs';

import { FsTabsModule } from '@firestitch/tabs';

import { FsFormConfirmTabsDirective } from '../../../../src/app/directives/confirm-tabs/confirm-tabs.directive';
import { LinkedNotesComponent } from '../linked-notes/linked-notes.component';
import { LinkedSettingsComponent } from '../linked-settings/linked-settings.component';


@Component({
  selector: 'app-linked-profile',
  templateUrl: './linked-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    MatTabContent,
    FsTabsModule,
    FsFormConfirmTabsDirective,
    LinkedSettingsComponent,
    LinkedNotesComponent,
  ],
})
export class LinkedProfileComponent {

  @Input() public account;

  public topTab = 'settings';
}
