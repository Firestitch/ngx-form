import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { FsFormDirective } from '../directives/form/form.directive';
import { confirmResultContinue } from '../helpers';
import { getActiveRoute } from '../helpers/get-active-route';
import { FsForm } from '../services/fsform.service';


@Injectable({
  providedIn: 'root',
})
export class FormDeactivateGuard  {

  constructor(
    private _form: FsForm,
    private _route: ActivatedRoute,
  ) {}

  public canDeactivate(): Observable<boolean> {
    const route = getActiveRoute(this._route);

    if (!route) {
      console.error('Can not find route for FormDeactivateGuard checks');

      return of(true);
    }

    const directives: FsFormDirective[] = this._form
      .getFormDirectives(route.routeConfig.component);

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
