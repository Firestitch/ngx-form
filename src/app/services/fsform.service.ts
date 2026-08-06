import { inject, Injectable, Type } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';


import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ConfirmUnsavedComponent } from '../components/confirm-unsaved';
import { ConfirmResult } from '../enums';
import { FsFormOwner } from '../interfaces';


@Injectable({
  providedIn: 'root',
})
export class FsForm {

  // value is array for future possibilities of extension
  private _formDirectiveStore = new WeakMap<Type<any>, FsFormOwner[]>();
  private _dialog = inject(MatDialog);

  public registerFormDirective(routeComponent: Type<any>, directive: FsFormOwner) {
    const directives = this.getFormDirectives(routeComponent) || [];
    directives.push(directive);

    this._formDirectiveStore.set(routeComponent, directives);
  }

  public getFormDirectives(routeComponent): FsFormOwner[] {
    return this._formDirectiveStore.get(routeComponent);
  }

  public removeFormDirective(routeComponent) {
    this._formDirectiveStore.delete(routeComponent);
  }

  public hasChanges(form: FsFormOwner): boolean {
    // Spans the linked set, so a dialog whose fields live in a nested tab form
    // still knows it has changes. A form linked out with `[link]="false"` is
    // absent from that set and never triggers the prompt - which is the point of
    // an instant-save panel: it has nothing outstanding to warn about.
    return form.linkedForms
      .some((linkedForm) => Object.keys(linkedForm.ngForm.control.controls)
        .some((key) => linkedForm.ngForm.control.controls[key].dirty));
  }

  public confirmUnsaved(
    form: FsFormOwner,
  ): Observable<ConfirmResult> {
    if (!form.confirm || !this.hasChanges(form)) {
      return of(ConfirmResult.NoChanges);
    }

    let title = 'You have unsaved changes';
    let message = 'What would you like to do with your changes?';
    let saveLabel = 'Save and continue';
    let discardLabel = 'Discard changes and continue';
    let cancelLabel = 'Review changes';

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
            form.linkedForms
              .forEach((linkedForm) => linkedForm.ngForm.control.markAsPristine());

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
