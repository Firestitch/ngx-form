import { NgModule, Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'emit-example',
  templateUrl: 'emit-example.component.html'
})
export class EmitExampleComponent implements OnInit {
  @ViewChild('form') form;
  status = 'Not Submitted';

  constructor() {  }

  ngOnInit() {  }

  submitting() {
    this.status = 'Submitting...';
  }

  save() {
    this.status = 'Valid';
  }

  invalid(form) {
    this.status = 'Invalid';
  }

  emitSubmit(form) {
    this.form.ngSubmit.emit();
  }

}
