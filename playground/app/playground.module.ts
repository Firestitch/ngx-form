import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { FsApiModule } from '@firestitch/api';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsDialogModule } from '@firestitch/dialog';
import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';
import { FsPhoneModule } from '@firestitch/phone';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsStoreModule } from '@firestitch/store';
import { FsTabsModule } from '@firestitch/tabs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BroadcastExampleComponent, DeactivateComponent, DeactivateLeaveComponent, DialogComponent, DialogCreateComponent, DialogExampleComponent, DialogSaveComponent, DrawerComponent, DrawerExampleComponent, EmitExampleComponent, ExamplesComponent, FirstExampleComponent, FunctionComponent, NestedComponent, NestedLevel1Component, NestedLevel2Component, NonMaterialComponent, SubmitObservableComponent, TabsExampleComponent, TemplateComponent } from './components';
import { AppMaterialModule } from './material.module';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsFormModule,
    FsStoreModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsSkeletonModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsDialogModule.forRoot(),
    FsDatePickerModule.forRoot(),
    FsCheckboxGroupModule,
    FsRadioGroupModule,
    FsApiModule,
    FsTabsModule.forRoot(),
    FsPhoneModule.forRoot(),
    FsAutocompleteChipsModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ExamplesComponent },
      { path: 'leave', component: DeactivateLeaveComponent },
    ], 
    { relativeLinkResolution: 'legacy' }),
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
    ExamplesComponent,
    NonMaterialComponent,
    SubmitObservableComponent,
    DeactivateComponent,
    DeactivateLeaveComponent,
    DialogExampleComponent,
    DialogComponent,
    DrawerComponent,
    DrawerExampleComponent,
    TabsExampleComponent,
    DialogCreateComponent,
    DialogSaveComponent,
    TemplateComponent,
  ],
})
export class PlaygroundModule {
}
