import { FsAsyncValidateDirective } from './fsAsyncValidate.directive';
import { FsInputDirective } from './fsInput.directive';
import { FsFormDirective } from './fsform.directive';
import { HttpClientModule } from '@angular/common/http';
import { FsApiConfig } from './../.tmp/fsapi.service';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './fsapi.service';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

    //MATERIAL
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule
    //MATERIAL END
],
declarations: [
  FsFormDirective,
  FsInputDirective,
  FsAsyncValidateDirective
],
providers: [
  FsFormDirective,
  FsInputDirective,
  FsAsyncValidateDirective
],
exports: [
  FsFormDirective,
  FsInputDirective,
  FsAsyncValidateDirective
]
})
export class FsFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsFormModule,
      providers: [
        FsFormDirective,
        FsInputDirective,
        FsAsyncValidateDirective
      ]
    };
  }
}
