import { Injectable } from '@angular/core';
import { ActivatedRoute, CanDeactivate } from '@angular/router';

import { FsPrompt } from '@firestitch/prompt';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { FsFormDirective } from '../directives/form/form.directive';
import { confirmUnsaved } from '../helpers/confirm-unsaved';
import { confirmResultContinue } from '../helpers';
import { FsForm } from '../services/fsform.service';
import { getActiveRoute } from '../helpers/get-active-route';


@Injectable({
  providedIn: 'root',
})
export class FormDeactivateGuard implements CanDeactivate<any> {

  constructor(
    private _prompt: FsPrompt,
    private _fsForm: FsForm,
    private _route: ActivatedRoute,
  ) {}

  canDeactivate(): Observable<boolean> {
    const route = getActiveRoute(this._route);

    if (!route) {
      console.error(`Can not find route for FormDeactivateGuard checks`);

      return of(true);
    }

    const directives: FsFormDirective[] = this._fsForm.getFormDirectives(route.routeConfig.component);

    if (!Array.isArray(directives) || directives.length === 0) {
      console.error(`Can not find a valid FsFormDirective`);

      return of(true);
    }

    return confirmUnsaved(directives, this._prompt)
      .pipe(
        map((result) => {
          return confirmResultContinue(result);
        }),
      );
  }

}
