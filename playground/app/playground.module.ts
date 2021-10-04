import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsFormModule, FormDeactivateGuard } from '@firestitch/form';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FlexLayoutModule } from '@angular/flex-layout';
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

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';

import { TabsExampleComponent } from './components/tabs-example/tabs-example.component';
import { DrawerExampleComponent } from './components/drawer-example/drawer-example.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { FirstExampleComponent } from './components/first-example/first-example.component';
import { EmitExampleComponent } from './components/emit-example/emit-example.component';
import { BroadcastExampleComponent } from './components/broadcast-example/broadcast-example.component';
import { FunctionComponent } from './components/function/function.component';
import { NestedComponent } from './components/nested/nested.component';
import { NestedLevel1Component } from './components/nested-level-1/nested-level-1.component';
import { ExamplesComponent } from './components/examples';
import { NonMaterialComponent } from './components/non-material/non-material.component';
import { NestedLevel2Component } from './components/nested-level-2/nested-level-2.component';
import { SubmitObservableComponent } from './components/submit-observable/submit-observable.component';
import { DeactivateComponent } from './components/deactivate/deactivate.component';
import { DeactivateLeaveComponent } from './components/deactivate-leave/deactivate-leave.component';
import { DialogExampleComponent } from './components/dialog-example/dialog-example.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogCreateComponent } from './components/dialog-create/dialog-create.component';
import { DialogSaveComponent } from './components/dialog-save/dialog-save.component';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsFormModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsSkeletonModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsDialogModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsDatePickerModule.forRoot(),
    FsCheckboxGroupModule,
    FsRadioGroupModule,
    FlexLayoutModule,
    FsApiModule,
    FlexLayoutModule,
    FsPromptModule,
    FsTabsModule.forRoot(),
    FsPhoneModule.forRoot(),
    FsAutocompleteChipsModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ExamplesComponent, canDeactivate: [FormDeactivateGuard] },
      { path: 'leave', component: DeactivateLeaveComponent },
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
  ],
  entryComponents: [
    DialogComponent,
    DrawerComponent
  ]
})
export class PlaygroundModule {
}
