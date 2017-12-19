/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { FsDatepickerModule } from '@firestitch/fs-datepicker';
import { FsCheckboxGroupModule } from '@firestitch/fscheckboxgroup';

import { FsMaterialModule } from '@firestitch/material';
import { FsFormModule }  from '@firestitch/form';

@Component({
  selector: 'app-root',
  styleUrls: [
    'styles.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html'
})
class AppComponent {
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

  save(form) {
    console.log('Save', form);
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

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FsFormModule,
    FormsModule,
    FsMaterialModule,
    FlexLayoutModule,
    FsMaterialModule,
    FsDatepickerModule,
    FsCheckboxGroupModule
   ]
})
class AppModule {
 }


platformBrowserDynamic().bootstrapModule(AppModule);
