import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { values } from 'lodash-es';
import { FsForm } from '../../services/fsform.service';
import { isObservable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: '[fsForm]',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsFormComponent implements OnInit, OnDestroy {

  @ContentChild(NgForm, { static: true }) ngForm: NgForm;
  @Input() wrapperSelector = '.fs-form-wrapper,.mat-form-field';
  @Input() messageSelector = '.fs-form-message,.mat-form-field-subscript-wrapper';
  @Input() hintSelector = '.fs-form-hint,.mat-form-field-hint-wrapper';
  @Input() labelSelector = '.fs-form-label,.mat-form-field-label';
  @Input() submit: Function;
  @Output('fsForm') submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() invalid: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.fs-form') fsformClass = true;

  public submitting = false;

  private _destroy$ = new Subject();
  private _activeButton;

  private static progressSvg = `<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
  <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
          <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
          <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur=".7s"
                  repeatCount="indefinite"/>
          </path>
      </g>
  </g>
</svg>`;

  private static successSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512px" height="512px"><g><g>
	<g>
		<path d="M437.019,74.98C388.667,26.629,324.38,0,256,0C187.619,0,123.331,26.629,74.98,74.98C26.628,123.332,0,187.62,0,256    s26.628,132.667,74.98,181.019C123.332,485.371,187.619,512,256,512c68.38,0,132.667-26.629,181.019-74.981    C485.371,388.667,512,324.38,512,256S485.371,123.333,437.019,74.98z M256,482C131.383,482,30,380.617,30,256S131.383,30,256,30    s226,101.383,226,226S380.617,482,256,482z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
	</g>
</g><g>
	<g>
		<path d="M378.305,173.859c-5.857-5.856-15.355-5.856-21.212,0.001L224.634,306.319l-69.727-69.727    c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.857-5.858,15.355,0,21.213l80.333,80.333c2.929,2.929,6.768,4.393,10.606,4.393    c3.838,0,7.678-1.465,10.606-4.393l143.066-143.066C384.163,189.215,384.163,179.717,378.305,173.859z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
	</g>
</g></g> </svg>`;

  private static errorSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="512px" height="512px" viewBox="0 0 16 16" class="hovered-paths"><g><path fill="#FFFFFF" d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z" data-original="#444444" class="hovered-path active-path" data-old_color="#444444"/><path fill="#FFFFFF" d="M12.2 10.8l-2.8-2.8 2.8-2.8-1.4-1.4-2.8 2.8-2.8-2.8-1.4 1.4 2.8 2.8-2.8 2.8 1.4 1.4 2.8-2.8 2.8 2.8z" data-original="#444444" class="hovered-path active-path" data-old_color="#444444"/></g> </svg>`;

  @HostListener('click', ['$event'])
  public windowClick(event: any): void {
    const path = event.path || event.composedPath();
    path.push(event.target);
    this._activeButton = null;
    const index = path.indexOf(this._element.nativeElement);
    if (index >= 0) {
      this._activeButton = path.splice(0, index).find(el => {
        return el.nodeName === 'BUTTON' && el.type === 'submit';
      });
    }
  }

  constructor(private _form: FsForm,
              private _element: ElementRef) {}

  ngOnInit() {

    if (this.ngForm) {
      this.ngForm.ngSubmit
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((event: KeyboardEvent) => {

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

        const promise = new Promise((resolve, reject) => {

          Promise.all(validations)
          .then(() => {

              if (this.ngForm.form.status === 'INVALID') {

                this._form.broadcast('invalid', this.ngForm);

                if (this.invalid) {
                  this.invalid.emit(this.ngForm);
                }

                reject();

              } else {

                this._form.broadcast('valid', this.ngForm);
                this.submitEvent.emit(this.ngForm);

                if (this.submit) {
                  const result = this.submit(this.ngForm);

                  if (isObservable(result)) {

                    const submitButton: any = Array.from(this._element.nativeElement
                                                            .querySelectorAll('button[type="submit"]'))
                                          .find(button => { return this._activeButton === button });
                    let progressEl;
                    if (submitButton && this.submitting) {
                      progressEl = new DOMParser().parseFromString(FsFormComponent.progressSvg, 'text/xml').firstChild;
                      submitButton.append(progressEl);
                      submitButton.classList.add('submit-process');
                    }

                    result
                    .pipe(
                      takeUntil(this._destroy$)
                    )
                    .subscribe(() => {
                      if (submitButton) {
                        submitButton.removeChild(progressEl);
                        submitButton.classList.remove('submit-process');
                      }
                      resolve();
                    }, () => {
                      if (submitButton) {
                        submitButton.removeChild(progressEl);
                        submitButton.classList.remove('submit-process');
                      }
                      reject();
                    });

                  } else {
                    resolve();
                  }

                } else {
                  resolve();
                }
              }

          }).catch(e => {
            reject();
          });
        });

        const submittingButton: any =  Array.from(this._element.nativeElement
            .querySelectorAll('button[type="submit"]'))
            .find(button => { return this._activeButton === button });

        promise.then(() => {
          this._completeSubmit(submittingButton, 'submit-success', FsFormComponent.successSvg);
        }).catch(() => {
          this._completeSubmit(submittingButton, 'submit-error', FsFormComponent.errorSvg);
        });
      });
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _completeSubmit(submittingButton, cls, svg) {

    let el;
    if (submittingButton) {
      el = new DOMParser().parseFromString(svg, 'text/xml').firstChild;
      submittingButton.classList.add(cls);
      submittingButton.append(el);
    }

    setTimeout(() => {
      if (submittingButton) {
        submittingButton.removeChild(el);
        submittingButton.classList.remove(cls);
      }

      this.submitting = false;
    }, 2000);
  }
}
