import { takeUntil } from 'rxjs/operators';
import { Directive, OnInit, Host, ElementRef, HostBinding, Optional, HostListener, Input, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { fromEvent, Subject } from 'rxjs';
import { ConfigService } from './../services/config.service';


@Directive({
  selector: 'form button[type="submit"],form button:not([type])',
})
export class FsSubmitButtonDirective implements OnInit, OnDestroy {

  @HostBinding('style.transition') transitionStyle = null;

  @Input() name;
  @Input() dirtySubmit = true;

  public active = false;

  private _destroy$ = new Subject();

  constructor(
    @Optional() @Host() private _matButton: MatButton,
    @Optional() private _configService: ConfigService,
    private _elementRef: ElementRef,
  ) {
    if (_configService) {
      this.transitionStyle = 'none';
    }

    fromEvent(this.element, 'click')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((event: UIEvent) => {
        this.active = true;
      });
  }

  public ngOnInit() {
    if (this._configService && this.dirtySubmit) {
      if (this._configService.form.dirtySubmitButton) {
        this.disable();
      }

      setTimeout(() => {
        this.transitionStyle = null;
      }, 500);
    }
  }

  public disable() {
    if (this._matButton) {
      this._matButton.disabled = true;
    }
  }

  public enable() {
    if (this._matButton) {
      this._matButton.disabled = false;
      this._matButton.disableRipple = true;
    }
  }

  public process() {
    this.setClass('process');

    this._matButton.disableRipple = true;
  }

  public success() {
    this.setClass('success');
    this._matButton.disableRipple = false;
  }

  public error() {
    this.setClass('error');
    this._matButton.disableRipple = false;
  }

  public setClass(cls) {
    const svg = this._getSvg(cls);
    this._resetClass();
    this._disableShadowAnimation();
    this.element.classList.add(`submit-${cls}`);
    this.element.append(svg);
  }

  public get element() {
    return this._elementRef.nativeElement;
  }

  public reset() {
    this.active = false;
    this.enable();
    const el = this.element.querySelector('.svg-icon');
    if (el) {
      this.element.removeChild(el);
    }
    this._matButton.disableRipple = false;
    this._resetClass();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _disableShadowAnimation() {
    // .mat-elevation-z2 removes the click shadow animation
    this.element.classList.add('mat-elevation-z2');
  }

  private _resetClass() {
    this.element.classList.remove('submit-success', 'submit-error', 'submit-process', 'mat-elevation-z2');
  }

  private _getSvg(type) {
    if (type === 'success') {
      return new DOMParser().parseFromString(`<svg class="svg-icon svg-icon-success" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512px" height="512px"><g><g><g><path d="M437.019,74.98C388.667,26.629,324.38,0,256,0C187.619,0,123.331,26.629,74.98,74.98C26.628,123.332,0,187.62,0,256 s26.628,132.667,74.98,181.019C123.332,485.371,187.619,512,256,512c68.38,0,132.667-26.629,181.019-74.981 C485.371,388.667,512,324.38,512,256S485.371,123.333,437.019,74.98z M256,482C131.383,482,30,380.617,30,256S131.383,30,256,30 s226,101.383,226,226S380.617,482,256,482z" data-original="#000000" data-old_color="#000000"/></g></g><g><g><path d="M378.305,173.859c-5.857-5.856-15.355-5.856-21.212,0.001L224.634,306.319l-69.727-69.727 c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.857-5.858,15.355,0,21.213l80.333,80.333c2.929,2.929,6.768,4.393,10.606,4.393 c3.838,0,7.678-1.465,10.606-4.393l143.066-143.066C384.163,189.215,384.163,179.717,378.305,173.859z" data-original="#000000" data-old_color="#000000"/></g></g></g> </svg>`, 'text/xml').firstChild;
    }

    if (type === 'process') {
      return new DOMParser().parseFromString(`<svg class="svg-icon svg-icon-process" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur=".7s" repeatCount="indefinite"/></path></g></g></svg>`, 'text/xml').firstChild;
    }

    if (type === 'error') {
      return new DOMParser().parseFromString(`<svg class="svg-icon svg-icon-error" xmlns="http://www.w3.org/2000/svg" width="38px" height="38px" viewBox="0 0 16 16"><g><path d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z" data-original="#444444" data-old_color="#444444"/><path d="M12.2 10.8l-2.8-2.8 2.8-2.8-1.4-1.4-2.8 2.8-2.8-2.8-1.4 1.4 2.8 2.8-2.8 2.8 1.4 1.4 2.8-2.8 2.8 2.8z"/></g> </svg>`, 'text/xml').firstChild;
    }
  }
}
