/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FlexLayoutModule } from '@angular/flex-layout';

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
