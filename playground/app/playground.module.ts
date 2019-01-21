import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsFormModule } from '@firestitch/form';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsAccountPickerModule } from '@firestitch/account-picker';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';

import { FirstExampleComponent } from './components/first-example/first-example.component';
import { EmitExampleComponent } from './components/emit-example/emit-example.component';
import { BroadcastExampleComponent } from './components/broadcast-example/broadcast-example.component';
import { FunctionComponent } from './components/function/function.component';
import { NestedComponent } from './components/nested/nested.component';
import { NestedFormComponent } from './components/nested-form/nested-form.component';


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
    FsAccountPickerModule,
    FsAutocompleteChipsModule.forRoot(),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FirstExampleComponent,
    EmitExampleComponent,
    BroadcastExampleComponent,
    FunctionComponent,
    NestedComponent,
    NestedFormComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
