import { Directive, OnInit, Host, ElementRef, HostBinding, Optional, HostListener, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ConfigService } from './../services/config.service';


@Directive({
  selector: 'form button[type="submit"],form button:not([type])'
})
export class FsSubmitButtonDirective implements OnInit {

  @HostBinding('style.transition') transitionStyle = null;

  @HostListener('click', ['$event.target'])
  click() {
    this.active = true;
  }

  @Input() name;

  public active = false;

  constructor(@Host() private _matButton: MatButton,
              private _element: ElementRef,
              @Optional() private _configService: ConfigService) {
    if (_configService) {
      this.transitionStyle = 'none';
    }
  }

  ngOnInit() {
    if (this._configService) {
      if (this._configService.form.dirtySubmitButton) {
        this.disable();
      }

      setTimeout(() => {
        this.transitionStyle = null;
      }, 500);
    }
  }

  public disable() {
    this._matButton.disabled = true;
  }

  public enable() {
    this._matButton.disabled = false;
  }

  public get element() {
    return this._element.nativeElement;
  }
}
