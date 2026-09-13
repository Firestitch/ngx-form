import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { confirmResultContinue } from '../helpers';
import { getActiveRoute } from '../helpers/get-active-route';
import { getRouteComponent } from '../helpers/get-route-component';
import { FsFormOwner } from '../interfaces';
import { FsForm } from '../services/fsform.service';


@Injectable({
  providedIn: 'root',
})
export class FormDeactivateGuard  {
  private _form = inject(FsForm);
  private _route = inject(ActivatedRoute);


  public canDeactivate(): Observable<boolean> {
    const route = getActiveRoute(this._route);

    if (!route) {
      console.error('Can not find route for FormDeactivateGuard checks');

      return of(true);
    }

    const directives: FsFormOwner[] = this._form
      .getFormDirectives(getRouteComponent(route.routeConfig));

    if (!Array.isArray(directives) || directives.length === 0) {
      console.error('Can not find a valid FsFormDirective');

      return of(true);
    }

    return this._form.confirmUnsaved(directives[0])
      .pipe(
        map((result) => {
          return confirmResultContinue(result);
        }),
      );
  }

}
