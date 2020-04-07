import { Directive, OnInit, Host } from '@angular/core';
import { MatButton } from '@angular/material';

@Directive({
  selector: 'form button[type="submit"]'
})
export class FsSubmitButtonDirective implements OnInit {

  constructor(@Host() private _matButton: MatButton) {}

  ngOnInit() {
    this.disable();
  }

  public disable() {
    this._matButton.disabled = true;
  }

  public enable() {
    this._matButton.disabled = false;
  }
}
