import { AfterContentInit, ContentChildren, Directive, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';


@Directive({
  selector: '[fsFormTemplate]',
})
export class FsFormTemplateDirective implements AfterContentInit {

  constructor(
   //public templateRef: TemplateRef<FsFormTemplateDirective>
  ) {}

  @ViewChildren(NgModel) 
  public models: QueryList<NgModel>;

  public ngAfterContentInit(): void {

  }
}
