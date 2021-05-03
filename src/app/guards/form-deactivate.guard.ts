import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { FsPrompt } from '@firestitch/prompt';
import { Observable, of } from 'rxjs';
import { FsFormDirective } from '../directives/form/form.directive';
import { FormDeactivate } from '../interfaces/form-deactivate';
import { confirmUnsaved } from '../helpers/confirm-unsaved';
import { map } from 'rxjs/operators';
import { confirmResultContinue } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class FormDeactivateGuard implements CanDeactivate<any> {

  constructor(private _prompt: FsPrompt) {}

  canDeactivate(directive: FormDeactivate): Observable<boolean> {

    if (!('getForm' in directive)) {
      const error = `Directive ${(<any>directive).constructor.name} does not property implement interface FormDeactivate`;
      console.error(error);
      return of(true);
    }

    const form: FsFormDirective = directive.getForm();

    if (!(form instanceof FsFormDirective)) {
      const error = `Directive ${directive.constructor.name}.getForm() does not return a valid FsFormDirective`;
      console.error(error);
      return of(true);
    }

    return confirmUnsaved(form, this._prompt)
      .pipe(
        map((result) => {
          return confirmResultContinue(result);
        }),
      );
  }
}
