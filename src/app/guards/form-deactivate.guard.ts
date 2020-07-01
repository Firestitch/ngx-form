import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { FsPrompt } from '@firestitch/prompt';
import { Observable, of } from 'rxjs';
import { FsFormComponent } from '../components/form/form.component';
import { FormDeactivate } from '../interfaces/form-deactivate';
import { confirmUnsaved } from '../helpers/confirm-unsaved';
import { map } from 'rxjs/operators';
import { confirmResultContinue } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class FormDeactivateGuard implements CanDeactivate<any> {

  constructor(private _prompt: FsPrompt) {}

  canDeactivate(component: FormDeactivate): Observable<boolean> {

    if (!('formComponent' in component)) {
      const error = `Component ${(<any>component).constructor.name} does not property implement interface FormDeactivate`;
      console.error(error);
      return of(true);
    }

    const form: FsFormComponent = component.formComponent;

    if (!form) {
      const error = `Component ${component.constructor.name}.formComponent does not return a valid FsFormComponent`;
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
