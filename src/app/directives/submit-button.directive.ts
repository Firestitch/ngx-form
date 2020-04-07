import { Directive, OnInit, Host, ElementRef } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Directive({
  selector: 'form button[type="submit"]'
})
export class FsSubmitButtonDirective {

  constructor(@Host() private _matButton: MatButton,
              private _element: ElementRef) {}

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
