import {
  ChangeDetectorRef, Directive, ElementRef,
  HostBinding, inject, Input, OnDestroy, OnInit,
} from '@angular/core';

import { MatButton } from '@angular/material/button';

import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsFormDirective } from './form';
import { FsFormBaseDirective } from './form-base';
import { FsFormGroupDirective } from './form-group';


@Directive({
  selector: '[mat-raised-button],[mat-button],[mat-flat-button],[mat-stroked-button]',
})
export class FsButtonDirective implements OnInit, OnDestroy {

  @Input()
  public name;

  @Input()
  public dirtySubmit = true;

  @HostBinding('style.transition')
  public transitionStyle = null;

  public submit = false;

  private _previousDisabled = false;
  private _destroy$ = new Subject();

  private _formGroup = inject(FsFormGroupDirective, { optional: true });
  private _form = inject(FsFormDirective, { optional: true });
  private _matButton = inject(MatButton, { optional: true, host: true });
  private _elementRef = inject(ElementRef);
  private _cdRef = inject(ChangeDetectorRef);
  private _formBase: FsFormBaseDirective;

  public ngOnInit() {
    this.submit = this._elementRef.nativeElement.getAttribute('type') === 'submit';
    this._formBase = this._form || this._formGroup;

    if (this._formBase) {
      this._formBase.addButton(this);

      if(this.submit) {
        fromEvent(this.element, 'click')
          .pipe(
            takeUntil(this._destroy$),
          )
          .subscribe(() => {
            this._formBase.activeSubmitButton = this;
            this._formBase.triggerSubmit();
          });

        this.transitionStyle = 'none';
        setTimeout(() => {
          this.transitionStyle = null;
        }, 500);
      }
    }
  }

  public disable() {    
    if (this._matButton && !this._formBase.activeSubmitButton) {
      this._previousDisabled = this._matButton.disabled;
      this._matButton.disabled = true;
      this._matButton.disableRipple = true;
      this._cdRef.markForCheck(); 
    }
  }

  public enable() {
    if (this._matButton) {
      this._matButton.disabled = false;
      this._matButton.disableRipple = true;
      this._cdRef.markForCheck();
    }
  }

  public process() {
    this.setClass('process');
    if (this._matButton) {
      this._matButton.disableRipple = true;
    }
  }

  public success() {
    this.setClass('success');
    if (this._matButton) {
      this._matButton.disableRipple = false;
    }
  }

  public error() {
    this.setClass('error');
    if (this._matButton) {
      this._matButton.disableRipple = false;
    }
  }

  public setClass(cls) {
    const svg = this._getSvg(cls);
    this._resetClass();
    this.element.classList.add(`fs-form-submit-button-${cls}`);
    this.element.append(svg);
  }

  public get element() {
    return this._elementRef.nativeElement;
  }

  public reset() {
    if(!this._previousDisabled) {
      this.enable();
    }

    this.element.querySelectorAll('.svg-icon')
      .forEach((el) => {
        el.remove();
      });

    if (this._matButton) {
      this._matButton.disableRipple = false;
    }
    this._resetClass();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
    this._formBase?.removeButton(this);
  }

  private _resetClass() {
    this.element.classList
      .remove(
        'fs-form-submit-button-success', 
        'fs-form-submit-button-error', 
        'fs-form-submit-button-process',
      );
  }

  private _getSvg(type) {
    if (type === 'success') {
      return new DOMParser().parseFromString(`<svg class="svg-icon svg-icon-success" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 38 38" style="enable-background:new 0 0 38 38;" xml:space="preserve" width="38px" height="38px">
      <g>
        <g class="check">
          <g>
            <path d="M29.6,11.9c-0.5-0.5-1.3-0.5-1.8,0L16.3,23.4l-6.1-6.1c-0.5-0.5-1.3-0.5-1.8,0s-0.5,1.3,0,1.8l7,7c0.3,0.3,0.6,0.4,0.9,0.4s0.7-0.1,0.9-0.4l12.4-12.4C30.1,13.2,30.1,12.4,29.6,11.9z"/>
          </g>
        </g>
      </g>
      </svg>`, 'text/xml').firstChild;
    }

    if (type === 'process') {
      return new DOMParser().parseFromString(`<svg class="svg-icon svg-icon-process" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
          <path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur=".7s" repeatCount="indefinite"/></path>
        </g>
      </g>
      </svg>`, 'text/xml').firstChild;
    }

    if (type === 'error') {
      return new DOMParser().parseFromString('<svg class="svg-icon svg-icon-error" xmlns="http://www.w3.org/2000/svg" width="38px" height="38px" viewBox="0 0 16 16"><g><path d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z" data-original="#444444" data-old_color="#444444"/><path d="M12.2 10.8l-2.8-2.8 2.8-2.8-1.4-1.4-2.8 2.8-2.8-2.8-1.4 1.4 2.8 2.8-2.8 2.8 1.4 1.4 2.8-2.8 2.8 2.8z"/></g> </svg>', 'text/xml').firstChild;
    }
  }
}
