import { inject, Injectable, Type } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';


import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ConfirmUnsavedComponent } from '../components/confirm-unsaved';
import type { FsFormDirective } from '../directives/form/form.directive';
import { ConfirmResult } from '../enums';


@Injectable({
  providedIn: 'root',
})
export class FsForm {

  // value is array for future possibilities of extension
  private _formDirectiveStore = new WeakMap<Type<any>, FsFormDirective[]>();
  private _dialog = inject(MatDialog);

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
    form: FsFormDirective, 
  ): Observable<ConfirmResult> {
    if (!form.confirm) {
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

    return this._dialog
      .open(ConfirmUnsavedComponent, {
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

            return form.submit$({ confirmed: true })
              .pipe(
                map((submitEvent) => {
                  if(submitEvent.error) {
                    return ConfirmResult.Invalid;
                  }

                  return ConfirmResult.Save;
                }),
                catchError(() => {
                  return of(ConfirmResult.Invalid);
                }),
              );
          }
        }),
      );
  }

}
