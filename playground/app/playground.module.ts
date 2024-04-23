import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsFormModule } from '@firestitch/form';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsPhoneModule } from '@firestitch/phone';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { FsApiModule } from '@firestitch/api';
import { FsPromptModule } from '@firestitch/prompt';
import { FsDialogModule } from '@firestitch/dialog';
import { FsTabsModule } from '@firestitch/tabs';

import { AppMaterialModule } from './material.module';


import { BroadcastExampleComponent, DeactivateComponent, DeactivateLeaveComponent, DialogComponent, DialogCreateComponent, DialogExampleComponent, DialogSaveComponent, DrawerComponent, DrawerExampleComponent, EmitExampleComponent, ExamplesComponent, FirstExampleComponent, FunctionComponent, NestedComponent, NestedLevel1Component, NestedLevel2Component, NonMaterialComponent, SubmitObservableComponent, TabsExampleComponent, TemplateComponent } from './components';
import { FsStoreModule } from '@firestitch/store';


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
    FsPromptModule,
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
  ]
})
export class PlaygroundModule {
}
