import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

import { FsMessage } from '@firestitch/message';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { MatTabGroup, MatTab, MatTabContent } from '@angular/material/tabs';
import { FsTabsModule } from '@firestitch/tabs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';


@Component({
    selector: 'tabs-example',
    templateUrl: './tabs-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormDirective,
        FsSkeletonModule,
        MatTabGroup,
        FsTabsModule,
        MatTab,
        MatTabContent,
        MatFormField,
        MatLabel,
        MatInput,
        FsFormRequiredDirective,
        MatButton,
        FsButtonDirective,
    ],
})
export class TabsExampleComponent {

  public name;
  public email;
  public name1;
  public email1;
  public loaded = false;
  public confirm = true;
  public tab = 'first';
  
  private _message = inject(FsMessage);
  private _cdref = inject(ChangeDetectorRef);

  constructor(
  ) {
    setTimeout(() => {
      this.loaded = true;
      this._cdref.detectChanges();
    }, 2000);
  }

  public submit = () => {
    return of(true)
      .pipe(
        tap(() => {
          this._message.success('Saved Changes');
        }),
      );
  };
}
