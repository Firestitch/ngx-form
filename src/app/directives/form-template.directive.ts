import { AfterContentInit, ContentChildren, Directive, inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';


@Directive({
  selector: '[fsFormTemplate],fs-form-template',
})
export class FsFormTemplateDirective implements AfterContentInit {

  @ContentChildren(NgModel)
  protected _projectedControls: NgModel[];

  protected _ngForm: NgForm = inject(NgForm);

  public ngAfterContentInit(): void {
    this._projectedControls.forEach((control: NgModel) => {
      this._ngForm.addControl(control);
    });
  }
}
