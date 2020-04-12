import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DrawerRef } from '@firestitch/drawer';


@Component({
  templateUrl: 'drawer.component.html',
  styleUrls: ['drawer.component.scss']
})
export class DrawerComponent  {

  public animal = { name: '', color: '' };

  constructor(private _message: FsMessage,
              private _dialogRef: DrawerRef<DrawerComponent>) {}

  public close(response) {
    this._dialogRef.close(response);
  }

  public save = () => {
    return of(this.animal)
    .pipe(
      tap(response => {
        this._message.success('Saved changes');
      })
    );
  }
}
