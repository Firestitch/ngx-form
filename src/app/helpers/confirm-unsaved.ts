import { FsPrompt } from '@firestitch/prompt';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { FsFormDirective } from '../directives/form/form.directive';
import { ConfirmResult } from '../enums/confirm-result';


export function confirmUnsaved(form: FsFormDirective, prompt: FsPrompt): Observable<ConfirmResult> {
  return new Observable(observer => {

    if (!form.confirm || !form.ngForm.dirty) {
      observer.next(ConfirmResult.Pristine);
      observer.complete();
      return;
    }

    let title = 'You Have Unsaved Changes';
    let message = 'What would you like to do with your changes?';
    let saveLabel = 'Save & Continue';
    let discardLabel = 'Discard Changes & Continue';
    let cancelLabel = 'Review Changes';

    if (typeof form.confirm === 'object') {
      title = form.confirm.title || title;
      message = form.confirm.message || message;
      saveLabel = form.confirm.saveLabel || saveLabel;
      discardLabel = form.confirm.discardLabel || discardLabel;
      cancelLabel = form.confirm.cancelLabel || cancelLabel;
    }

    prompt.confirm({
      title: title,
      template: message,
      dialogConfig: { width: 'auto' },
      buttons: [
        {
          label: saveLabel,
          color: 'primary',
          value: 'save'
        },
        {
          label: discardLabel,
          value: 'discard'
        },
        {
          label: cancelLabel,
          cancel: true
        }
      ]
    }).subscribe((value) => {

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
