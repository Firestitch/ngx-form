import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { FsPrompt } from '@firestitch/prompt';
import { Observable, of } from 'rxjs';
import { FsFormComponent } from '../components/form/form.component';
import { FormDeactivate } from '../interfaces/form-deactivate';
import { confirmUnsaved } from '../helpers/confirm-unsaved';


@Injectable({
  providedIn: 'root'
})
export class FormDeactivateGuard implements CanDeactivate<any> {

  constructor(private _prompt: FsPrompt) {}

  canDeactivate(component: FormDeactivate): Observable<boolean> {

    const form: FsFormComponent = component.formDeactivateComponent;

    if (!form) {
      const error = `Component ${component.constructor.name} does not property implement interface FormCanDeactivate`;
      console.error(error);
      return of(true);
    }

    return confirmUnsaved(form, this._prompt);
  }
}
