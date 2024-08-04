import { Injectable, Type } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';


import { merge, Observable, of, Subject } from 'rxjs';
import { filter, first, map, mapTo, switchMap, take } from 'rxjs/operators';

import { ConfirmUnsavedComponent } from '../components/confirm-unsaved';
import { FsFormDirective } from '../directives/form/form.directive';
import { ConfirmResult } from '../enums';

interface BroadcastEvent {
    key: any;
    data?: any;
}


@Injectable({
  providedIn: 'root',
})
export class FsForm {

  // value is array for future possibilities of extension
  private _formDirectiveStore = new WeakMap<Type<any>, FsFormDirective[]>();

  private _eventBus: Subject<BroadcastEvent>;

  constructor(
    private _dialog: MatDialog,
  ) {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  // @deprecated
  public broadcast(key: any, data?: any) {
    this._eventBus.next({ key, data });
  }

  // @deprecated
  public on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .pipe(
        filter((event) => event.key === key),
        map((event) => <T>event.data),
      );
  }

  public registerFormDirective(routeComponent: Type<any>, directive: FsFormDirective) {
    const directives = this.getFormDirectives(routeComponent) || [];
    directives.push(directive);

    this._formDirectiveStore.set(routeComponent, directives);
  }

  public getFormDirectives(routeComponent): FsFormDirective[] {
    return this._formDirectiveStore.get(routeComponent);
  }

  public removeFormDirective(routeComponent) {
    this._formDirectiveStore.delete(routeComponent);
  }

  public confirmUnsaved(
    directives: FsFormDirective[], 
  ): Observable<ConfirmResult> {
  // TODO support for multiple directives per page
    const form = directives[0];

    if (!form.confirm || !form.ngForm.dirty) {
      return of(ConfirmResult.Pristine);
    }

    let title = 'You Have Unsaved Changes';
    let message = 'What would you like to do with your changes?';
    let saveLabel = 'Save & Continue';
    let discardLabel = 'Discard Changes & Continue';
    let cancelLabel = 'Review Changes';

    if (typeof form.confirm === 'object') {
      title = form.confirm.title || title;
      message = form.confirm.message || message;
      saveLabel = form.confirm.saveLabel || saveLabel;
      discardLabel = form.confirm.discardLabel || discardLabel;
      cancelLabel = form.confirm.cancelLabel || cancelLabel;
    }

    return this._dialog.open(ConfirmUnsavedComponent, {
      data: {
        title,
        message,
        saveLabel,
        discardLabel,
        cancelLabel,
      },
      width: 'auto', 
    })
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if(!result) {
            return of(ConfirmResult.Review);
          }
          
          if (result === 'discard') {
            form.reset();

            return of(ConfirmResult.Discard); 
          }

          if (result === 'save') {
            form.ngForm.control.markAsPristine();
            form.triggerSubmit({ confirmed: true });
          
            return merge(
              form.submitted
                .pipe(
                  first(),
                  mapTo(ConfirmResult.Save),
                ), 
              form.invalid
                .pipe(
                  first(),
                  mapTo(ConfirmResult.Invalid),
                ))
              .pipe(
                take(1),
              );
          }
        }),
      );
  }

}
