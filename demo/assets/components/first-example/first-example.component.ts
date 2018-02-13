import { NgModule, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FsForm } from './../../../../src/services/fsform.service';

@Component({
  selector: 'first-example',
  templateUrl: 'first-example.component.html',
  styleUrls: [ 'first-example.component.css' ]
})
export class FirstExampleComponent implements OnInit {
  required = true;
  visible = true;
  show = true;

  checkbox: object[] = [];

  items = [
    { name: 'Item 1', id: 1 },
    { name: 'Item 2', id: 2 },
    { name: 'Item 3', id: 3 },
    { name: 'Item 4', id: 4 }
  ];

  constructor(private fsForm: FsForm) {  }

  ngOnInit() {
    this.fsForm.on<string>('submit')
      .subscribe((form: any) => {
        console.log('broadcaster submit', form);
      });

    this.fsForm.on<string>('valid')
      .subscribe((form: any) => {
        console.log('broadcaster valid', form);
      });

    this.fsForm.on<string>('invalid')
      .subscribe((form: any) => {
        console.log('broadcaster not valid', form);
      });
  }

  save(form) {
    console.log('Save', form);
  }

  submit(form) {
    form.ngSubmit.emit();
  }

  functionPromise(formControl) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let testValue = formControl.value;
        if (testValue !== 'existing@email.com') {
          reject('Email should match "existing@email.com"');
        } else {
          resolve();
        }
      }, 1000);
    });
  }

}
