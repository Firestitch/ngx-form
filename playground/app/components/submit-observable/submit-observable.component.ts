import { Component, ViewChild } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { of, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'submit-observable',
  templateUrl: 'submit-observable.component.html',
  styleUrls: ['submit-observable.component.scss']
})
export class SubmitObservableComponent {

  constructor(private fsMessage: FsMessage) {}

  public submit = (form) => {
    return Observable.create(observer => {
      observer.next();
      observer.complete();
    })
    .pipe(
      delay(2000),
      tap(() => {
        this.fsMessage.success('Validation successful');
      })
    );
  }
}
