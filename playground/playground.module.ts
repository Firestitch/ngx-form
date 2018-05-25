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
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FirstExampleComponent } from './app/components/first-example/first-example.component';
import { EmitExampleComponent } from './app/components/emit-example/emit-example.component';
import { BroadcastExampleComponent } from './app/components/broadcast-example/broadcast-example.component';
import { FunctionComponent } from './app/components/function/function.component';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsFormModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule,
    FsDatePickerModule,
    FsCheckboxGroupModule,
    FsRadioGroupModule,
    FlexLayoutModule
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FirstExampleComponent,
    EmitExampleComponent,
    BroadcastExampleComponent,
    FunctionComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
