import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { of, Subject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { DrawerRef } from '@firestitch/drawer';


@Component({
  templateUrl: 'drawer.component.html',
  styleUrls: ['drawer.component.scss']
})
export class DrawerComponent  {

  public animal = { name: '', color: '' };

  constructor(private _message: FsMessage,
              private _dialogRef: DrawerRef<DrawerComponent>) {}

  public close() {
  }

  public save = () => {
    return of(this.animal)
      .pipe(
        delay(200),
        tap(() => {
          this._message.success('Saved changes');
        })
    );
  }
}
