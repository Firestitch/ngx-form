import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FsMessage } from '@firestitch/message';

import { delay, of, tap } from 'rxjs';
import { FsFormGroupDirective } from '../../../../src/app/directives/form-group/form-group.directive';
import { MatTabGroup, MatTab, MatTabContent } from '@angular/material/tabs';
import { FsTabsModule } from '@firestitch/tabs';
import { MatAnchor, MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';
import { FormsModule } from '@angular/forms';
import { FsFormDirective } from '../../../../src/app/directives/form/form.directive';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';


@Component({
    selector: 'app-form-group',
    templateUrl: './form-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsFormGroupDirective,
        MatTabGroup,
        FsTabsModule,
        MatTab,
        MatTabContent,
        MatAnchor,
        FsButtonDirective,
        FormsModule,
        FsFormDirective,
        MatFormField,
        MatInput,
        FsFormRequiredDirective,
        MatButton,
    ],
})
export class FormGroupExampleComponent {

  public name;
  public form = 1;

  private _message = inject(FsMessage);

  public submit = () => {
    return of(true)
      .pipe(
        delay(2000000),
        tap(() => {
          this._message.success('Saved Changes');
        }),
      );
  };
}
