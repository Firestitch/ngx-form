import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FsMessage } from '@firestitch/message';

import { delay, of, tap } from 'rxjs';


@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
