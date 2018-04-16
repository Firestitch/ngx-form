import { NgModule, Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FsForm } from './../../../../src/services/fsform.service';

@Component({
  selector: 'emit-example',
  templateUrl: 'emit-example.component.html'
})
export class EmitExampleComponent implements OnInit {
  @ViewChild('form') form;
  status = 'Not Submitted';

  constructor(private fsForm: FsForm) {  }

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
