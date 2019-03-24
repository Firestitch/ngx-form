import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsFormModule } from '@firestitch/form';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsPhoneModule } from '@firestitch/phone';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';

import { FirstExampleComponent } from './components/first-example/first-example.component';
import { EmitExampleComponent } from './components/emit-example/emit-example.component';
import { BroadcastExampleComponent } from './components/broadcast-example/broadcast-example.component';
import { FunctionComponent } from './components/function/function.component';
import { NestedComponent } from './components/nested/nested.component';
import { NestedLevel1Component } from './components/nested-level-1/nested-level-1.component';
import { NestedLevel2Component } from './components/nested-level-2/nested-level-2.component';
import { ExamplesComponent } from './components/examples';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsFormModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsDatePickerModule,
    FsCheckboxGroupModule,
    FsRadioGroupModule,
    FlexLayoutModule,
    FsPhoneModule.forRoot(),
    FsAutocompleteChipsModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ExamplesComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    FirstExampleComponent,
    EmitExampleComponent,
    BroadcastExampleComponent,
    FunctionComponent,
    NestedComponent,
    NestedLevel1Component,
    NestedLevel2Component,
    ExamplesComponent
  ]
})
export class PlaygroundModule {
}
