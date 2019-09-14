import { FsFormDirective } from '@firestitch/form';
import { Observable } from 'rxjs';

export const fsFormSubmit = (form: FsFormDirective) => (source: Observable<any>) =>
  new Observable(observer => {
    form.submitButton.disable();

    return source.subscribe({
      next(x) {
        form.submitButton.enable();
        observer.next(x);
      },
      error(err) {
        form.submitButton.enable();
        observer.error(err);
      },
      complete() {
        observer.complete();
      }
    });
  });
