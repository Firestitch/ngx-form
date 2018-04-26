import { NgModule, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FsForm } from './../../../../src';

@Component({
  selector: 'broadcast-example',
  templateUrl: 'broadcast-example.component.html'
})
export class BroadcastExampleComponent implements OnInit {

  status = 'Not Submitted';

  constructor(private fsForm: FsForm) {  }

  ngOnInit() {
    this.fsForm.on<string>('submit')
      .subscribe((form: any) => {
        this.status = 'Submitting...';
      });

    this.fsForm.on<string>('valid')
      .subscribe((form: any) => {
        this.status = 'Valid';
      });

    this.fsForm.on<string>('invalid')
      .subscribe((form: any) => {
        this.status = 'Invalid';
      });
  }

  save() {}
}
