import { DrawerComponent } from './../drawer/drawer.component';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FsDrawerService, FsDrawerAction } from '@firestitch/drawer';
import { MatButton } from '@angular/material/button';
import { FsButtonDirective } from '../../../../src/app/directives/button.directive';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'drawer-example',
    templateUrl: 'drawer-example.component.html',
    standalone: true,
    imports: [MatButton, FsButtonDirective, JsonPipe]
})
export class DrawerExampleComponent implements OnDestroy {

  public response;

  private _destroy$ = new Subject();

  constructor(public drawer: FsDrawerService) {}

  public open() {
    const drawerRef = this.drawer.open(DrawerComponent, {
      actions: [
        {
          icon: 'clear',
          type: FsDrawerAction.Button,
          close: true,
          click: ({event}) => {
            console.log('close clicked');
          }
        }
      ]
    });

    // drawerRef.afterClosed().subscribe(() => {
    //   console.log('The drawer was closed');
    // });

    // drawerRef.afterOpened().subscribe(() => {
    //   console.log('The drawer was opened');
    // });

    // drawerRef.closeStart().subscribe((result) => {
    //   console.log('close starts');
    //   result.next(null);
    // });

    // drawerRef.openStart().subscribe((result) => {
    //   console.log('open starts');
    //   result.next(null);
    // });
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
