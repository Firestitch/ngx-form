import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

import { FsMessage } from '@firestitch/message';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'tabs-example',
  templateUrl: './tabs-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsExampleComponent {

  public name;
  public email;
  public name1;
  public email1;
  public loaded = false;
  public confirm = true;
  
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
