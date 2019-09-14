import { Component, ViewChild } from '@angular/core';
import { FsFormDirective, fsFormSubmit } from '@firestitch/form';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'submit-disable-example',
  templateUrl: 'submit-disable-example.component.html'
})
export class SubmitDisableExampleComponent {
  public status = 'Not Submitted';

  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  constructor() {  }

  public save(): void {
    this.status = 'Submitting...';

    // Here is our usuall api call like this.http.post(...)
    const api = of('some api call here')
      .pipe(
        delay(4000) // Simulate network response delay
      );

    // Here is how we can bring auto disable for submit button
    api.pipe(
      fsFormSubmit(this.form)
    )
      .subscribe(() => {
        this.status = 'Submitted';
      })
  }
}
