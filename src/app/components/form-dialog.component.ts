import { HostListener, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FsFormComponent } from './form/form.component';
import { FsPrompt } from '@firestitch/prompt';
import { confirmUnsaved } from '../helpers/confirm-unsaved';
import { FsFormDialogCloseDirective } from '../directives/form-dialog-close.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Destroy } from '../decorators/destroy.decorator';
import { AfterViewInit } from '../decorators/after-view-init.decorator';


@Destroy()
@AfterViewInit(function () {

  this._formDialogClose.forEach(item => {
    this._registerClose(item);
  });

  this._formDialogClose.changes
  .pipe(
    takeUntil(this._formDestroy$)
  )
  .subscribe((e) => {
    e.forEach(item => {
      this._registerClose(item);
    });
  });
})
export class FormDialog {

  private _formDestroy$ = new Subject();

  @HostListener('window:keyup.esc') onKeyUp() {
    this._formClose();
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
      event.returnValue = false;
  }

  @ViewChild(FsFormComponent, { static: false }) _formDialogForm: FsFormComponent;
  @ViewChildren(FsFormDialogCloseDirective) _formDialogClose: QueryList<FsFormDialogCloseDirective>;

  private _formDialogRef: MatDialogRef<any>;
  private _formPrompt: FsPrompt;

  constructor(private formDialogRef: MatDialogRef<any>,
              private formPrompt: FsPrompt) {
    this._formDialogRef = formDialogRef;
    this._formPrompt = formPrompt;
    this._formDialogRef.disableClose = true;
    this._formDialogRef.backdropClick()
    .subscribe(_ => {
      this._formClose(null);
    });
  }

  protected _formDestroy() {
    this._formDestroy$.next();
    this._formDestroy$.complete();
  }

  private _formClose(value = null): void {

    confirmUnsaved(this._formDialogForm, this._formPrompt)
    .subscribe(close => {
      if (close) {
        this._formDialogRef.close(value);
      }
    });
  }

  private _registerClose(directive: FsFormDialogCloseDirective) {

    if (!directive.registered) {
      directive.registered = true;
      directive.clicked$
      .pipe(
        takeUntil(this._formDestroy$)
      )
      .subscribe(() => {
        this._formClose(null);
      });
    }
  }
}
