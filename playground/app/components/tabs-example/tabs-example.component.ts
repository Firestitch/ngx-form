import { Component } from '@angular/core';
import { Subject, of } from 'rxjs';
import { FsDrawerService } from '@firestitch/drawer';
import { FsMessage } from '@firestitch/message';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'tabs-example',
  templateUrl: 'tabs-example.component.html'
})
export class TabsExampleComponent {

  public email;
  public delay = false;
  public confirm = true;

  constructor(
    private _message: FsMessage,
  ) {
    setTimeout(() => {
      this.delay = true;
    }, 200);
  }

  public submit = () => {
    return of(true)
    .pipe(
      tap(() => {
        this._message.success('Saved Changes');
      })
    );
  }
}
