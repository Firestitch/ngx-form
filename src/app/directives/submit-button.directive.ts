import { Directive, OnInit, Host, ElementRef, HostBinding } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ConfigService } from './../services/config.service';


@Directive({
  selector: 'form button[type="submit"]'
})
export class FsSubmitButtonDirective implements OnInit {

  @HostBinding('style.transition') transitionStyle = 'none';

  constructor(@Host() private _matButton: MatButton,
              private _element: ElementRef,
              private _configService: ConfigService) {}

  ngOnInit() {
    if (this._configService.form.dirtySubmitButton) {
      this.disable();
    }

    setTimeout(() => {
      this.transitionStyle = null;
    }, 5000);
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
