import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { FsPrompt } from '@firestitch/prompt';
import { Observable } from 'rxjs';
import { FsFormComponent } from '../components/form/form.component';
import { first } from 'rxjs/operators';
import { FormDeactivate } from '../interfaces/form-deactivate';


@Injectable({
  providedIn: 'root'
})
export class FormDeactivateGuard implements CanDeactivate<any> {

  constructor(private _prompt: FsPrompt) {}

  canDeactivate(component: FormDeactivate): Observable<boolean> {

    return new Observable(observer => {

      const form: FsFormComponent = component.formDeactivateComponent;

      if (!form) {
        console.error(`Component ${component.constructor.name} not property implmented with interface FormCanDeactivate`);
        observer.error();
        return;
      }

      if (!form.ngForm.dirty) {
        observer.next(true);
        observer.complete();
        return;
      }

      this._prompt.confirm({
        title: 'You Have Unsaved Changes',
        template: 'What would you like to do with your changes?',
        dialogConfig: { width: 'auto' },
        buttons: [
          {
            label: 'Save & Continue',
            color: 'primary',
            value: 'save'
          },
          {
            label: 'Discard Changes & Continue',
            value: 'discard'
          },
          {
            label: 'Review Changes',
            cancel: true
          }
        ]
      }).subscribe(value => {

        if (value === 'discard') {
          observer.next(true);
          observer.complete();
        }

        if (value === 'save') {

          form.valid
          .pipe(
            first()
          )
          .subscribe(() => {
            observer.next(true);
            observer.complete();
          });

          form.invalid
          .pipe(
            first()
          )
          .subscribe(() => {
            observer.next(false);
            observer.complete();
          });

          form.ngForm.ngSubmit.emit();
        }

      }, (error: any) => {
        observer.next(false);
        observer.complete();
      });
    });
  }
}
