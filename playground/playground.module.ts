import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FsFormModule } from '../src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app/material.module';
import { FsExampleModule } from '@firestitch/example';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsDatepickerModule } from '@firestitch/datepicker';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsExamplesComponent } from './../tools/components/examples/examples.component';
import { FirstExampleComponent } from './app/components/first-example/first-example.component';
import { EmitExampleComponent } from './app/components/emit-example/emit-example.component';
import { BroadcastExampleComponent } from './app/components/broadcast-example/broadcast-example.component';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsFormModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule,
    FsDatepickerModule,
    FsCheckboxGroupModule,
    FsRadioGroupModule,
    FlexLayoutModule
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FsExamplesComponent,
    FirstExampleComponent,
    EmitExampleComponent,
    BroadcastExampleComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
