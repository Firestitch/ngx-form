import { OnInit, Output, EventEmitter, ContentChild, Input,
         Component, ViewEncapsulation, HostBinding, OnDestroy, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { values } from 'lodash-es';
import { FsForm } from '../services/fsform.service';
import { Subject, isObservable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: '[fsForm]',
  template: `<ng-content></ng-content>`,
  styles: [`.fs-form-label-required:after { content: " *"; display: contents }
            .fs-form .ng-invalid.ng-dirty .fs-form-label { color: #f44336 }
            .fs-form .fs-form-error { color: #f44336 }
            .fs-form .fs-form-message { margin-top: 0.54166667em }
            .fs-form .mat-placeholder-required { display: none }
            .fs-form button.submitting {
              background-image: url("data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+Cjxzdmcgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGNpcmNsZSBzdHJva2Utb3BhY2l0eT0iLjUiIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYgMThjMC05Ljk0LTguMDYtMTgtMTgtMTgiPgogICAgICAgICAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0KICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iCiAgICAgICAgICAgICAgICAgICAgdHlwZT0icm90YXRlIgogICAgICAgICAgICAgICAgICAgIGZyb209IjAgMTggMTgiCiAgICAgICAgICAgICAgICAgICAgdG89IjM2MCAxOCAxOCIKICAgICAgICAgICAgICAgICAgICBkdXI9IjFzIgogICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICAgIDwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==");
              background-position: right 16px center;
              background-repeat: no-repeat;
              background-size: 20px;
              padding-right: 46px;
              transition: none;
            }`],
  encapsulation: ViewEncapsulation.None
})
export class FsFormDirective implements OnInit, OnDestroy {

  @ContentChild(NgForm) ngForm;
  @Input() wrapperSelector = '.fs-form-wrapper,.mat-form-field';
  @Input() messageSelector = '.fs-form-message,.mat-form-field-subscript-wrapper';
  @Input() hintSelector = '.fs-form-hint,.mat-form-field-hint-wrapper';
  @Input() labelSelector = '.fs-form-label,.mat-form-field-label';
  @Input() submit: Function;
  @Output('fsForm') submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() invalid: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.fs-form') fsformClass = true;

  public submitting = false;
  private destroy$ = new Subject();

  constructor(private _form: FsForm,
              private _element: ElementRef) {}

  ngOnInit() {

    if (this.ngForm) {
      this.ngForm.ngSubmit
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(event => {

        if (event) {
          event.preventDefault();
        }

        if (this.submitting) {
          return false;
        }

        this.submitting = true;
        this._form.broadcast('submit', this.ngForm);
        const validations = [];

        values(this.ngForm.controls).forEach(control => {
          control.markAsDirty();
          control.markAsTouched();
        });

        values(this.ngForm.controls).forEach(control => {
            control.updateValueAndValidity();

            if (control.asyncValidator) {
              validations.push(control.asyncValidator().toPromise());
            }
        });

        Promise.all(validations)
        .then(() => {
            this.submitting = false;
            if (this.ngForm.form.status === 'INVALID') {

              this._form.broadcast('invalid', this.ngForm);

              if (this.invalid) {
                this.invalid.emit(this.ngForm);
              }

            } else {
              this._form.broadcast('valid', this.ngForm);
              this.submitEvent.emit(this.ngForm);

              if (this.submit) {
                const result = this.submit(this.ngForm);

                if (isObservable(result)) {

                  const buttons = this._element.nativeElement.querySelectorAll('button[type="submit"]')
                  buttons.forEach(button => {
                    button.classList.toggle('submitting');
                    button.disabled = true;
                  });

                  result.subscribe(response => {},
                  () => {},
                  () => {
                    buttons.forEach(button => {
                      button.classList.toggle('submitting');
                      button.disabled = false;
                    });
                  });
                }
              }
            }
        }).catch((e) => {
          this.submitting = false;
        });
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
