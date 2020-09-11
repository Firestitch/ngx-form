import { FsPrompt } from '@firestitch/prompt';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { FsFormComponent } from '../components/form/form.component';
import { ConfirmResult } from '../enums/confirm-result';


export function confirmUnsaved(form: FsFormComponent, prompt: FsPrompt): Observable<ConfirmResult> {
  return new Observable(observer => {

    if (!form.dirtyConfirm || !form.ngForm.dirty) {
      observer.next(ConfirmResult.Pristine);
      observer.complete();
      return;
    }

    prompt.confirm({
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
        observer.next(ConfirmResult.Discard);
        observer.complete();
        form.reset();
      }

      if (value === 'save') {

        form.submitted
        .pipe(
          first()
        )
        .subscribe(() => {
          observer.next(ConfirmResult.Save);
          observer.complete();
        });

        form.invalid
        .pipe(
          first()
        )
        .subscribe(() => {
          observer.next(ConfirmResult.Invalid);
          observer.complete();
        });

        form.ngForm.control.markAsPristine();
        form.ngForm.ngSubmit.emit();
      }

    }, (error: any) => {
      observer.next(ConfirmResult.Review);
      observer.complete();
    });
  });
}
