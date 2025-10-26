import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FsFormModule } from '@firestitch/form';
import { FsStoreModule } from '@firestitch/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsDialogModule } from '@firestitch/dialog';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsApiModule } from '@firestitch/api';
import { FsTabsModule } from '@firestitch/tabs';
import { FsPhoneModule } from '@firestitch/phone';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { provideRouter } from '@angular/router';
import { ExamplesComponent, DeactivateLeaveComponent } from './app/components';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsFormModule, FsStoreModule.forRoot(), FormsModule, FsSkeletonModule, FsExampleModule.forRoot(), FsMessageModule.forRoot(), FsDialogModule.forRoot(), FsDatePickerModule.forRoot(), FsCheckboxGroupModule, FsRadioGroupModule, FsApiModule, FsTabsModule.forRoot(), FsPhoneModule.forRoot(), FsAutocompleteChipsModule.forRoot()),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline', floatLabel: 'auto' },
        },
        provideAnimations(),
        provideRouter([
            { path: '', component: ExamplesComponent },
            { path: 'leave', component: DeactivateLeaveComponent },
        ]),
    ]
})
  .catch(err => console.error(err));

