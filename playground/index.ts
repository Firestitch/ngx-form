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
  save(form) {
    console.log('Save', form);
  }

  asyncValidate(formControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        let testValue = formControl.value;
        if (testValue === 'existing@email.com') {
          resolve({ asyncInvalid: 'Email already exists!' });
        } else {
          resolve(null);
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
    FlexLayoutModule
   ]
})
class AppModule {
 }


platformBrowserDynamic().bootstrapModule(AppModule);
