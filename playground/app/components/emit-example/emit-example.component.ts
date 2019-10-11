import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'emit-example',
  templateUrl: 'emit-example.component.html'
})
export class EmitExampleComponent implements OnInit {
  @ViewChild('form', { static: false }) form;

  status = 'Not Submitted';
  minMaxInput = null;
  required = null;

  constructor() {  }

  ngOnInit() {  }

  submitting() {
    this.status = 'Submitting...';
  }

  save() {
    this.status = 'Valid';
  }

  invalid() {
    this.status = 'Invalid';
  }

  emitSubmit() {
    this.form.ngSubmit.emit();
  }

}
