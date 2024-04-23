import { Component, ChangeDetectionStrategy, Input, ContentChildren, QueryList, AfterContentInit, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'fs-form-template',
  templateUrl: './form-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsFormTemplateComponent implements AfterContentInit {

  @ViewChild('templateRef1') 
  public templateRef: TemplateRef<any>;

  @Input() public formTemplate: any;
  
  @ContentChildren(NgModel, { descendants: true }) 
  public models: QueryList<NgModel>;

  public ngAfterContentInit(): void {
    debugger;
    const x = this.models;
    this.models.changes.subscribe((x) => {
      debugger;
    });
  }

  ngOnInit() {
    debugger;
  }

  constructor(
   
  ) {}

}
