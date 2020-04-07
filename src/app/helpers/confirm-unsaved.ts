import { Observable } from 'rxjs';
import { FsFormComponent } from '../components/form/form.component';
import { first } from 'rxjs/operators';
import { FsPrompt } from '@firestitch/prompt';

export function confirmUnsaved(form: FsFormComponent, prompt: FsPrompt): Observable<boolean> {
  return new Observable(observer => {

    if (!form.dirtyConfirm || !form.ngForm.dirty) {
      observer.next(true);
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
