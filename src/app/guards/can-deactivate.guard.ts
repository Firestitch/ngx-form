import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { FsPrompt } from '@firestitch/prompt';
import { Observable } from 'rxjs';
import { FsFormComponent } from '../components/form/form.component';


@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<any> {

  constructor(private _prompt: FsPrompt) {}

  canDeactivate(component: any): Observable<boolean> {

    return Observable.create(observer => {
      const form: FsFormComponent = component.formComponent;

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
            label: 'Review Change',
            color: 'primary',
            value: 'review'
          },
          {
            label: 'Discard Changes & Continue',
            value: 'discard'
          }
        ]
      }).subscribe(value => {

        observer.next(value === 'discard');
        observer.complete();

      }, (error: any) => {

      });
    });
  }
}
