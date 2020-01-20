import { Directive, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';


@Directive({
  selector: '[fsFormDialogClose],[fs-form-dialog-close]'
})
export class FsFormDialogCloseDirective implements OnDestroy {

  public clicked$ = new Subject();
  public registered = false;

  @HostBinding('attr.type') type = 'button';

  @HostListener('click', ['$event.target'])
  public click() {
    this.clicked$.next();
  }

  public ngOnDestroy() {
    this.clicked$.complete();
  }
}
