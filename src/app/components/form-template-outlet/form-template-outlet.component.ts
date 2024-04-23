import { Component, ChangeDetectionStrategy, Input, ContentChildren, QueryList, AfterContentInit, TemplateRef, SimpleChanges, OnChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FsFormTemplateComponent } from '../../components';


@Component({
  selector: 'fs-form-template-outlet',
  templateUrl: './form-template-outlet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsFormTemplateOutletComponent implements AfterContentInit, OnChanges {

  @Input() public formTemplate: FsFormTemplateComponent;
  
  @ContentChildren(NgModel, { descendants: true }) 
  public models: QueryList<NgModel>;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.formTemplate?.currentValue) {
    }
  }

  public ngAfterContentInit(): void {
    // const x = this.models;
    // this.models.changes.subscribe((x) => {
    //   debugger;
    // });
  }

  constructor(
   
  ) {}

}
