import { FsAsyncValidateDirective } from './fsAsyncValidate.directive';
import { FsInputDirective } from './fsInput.directive';

import { FsForm } from './fsform.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FsFormDirective,
  FsControlDirective,
  FsRequiredDirective,
  FsMinDirective,
  FsMaxDirective
} from './fsform.directive';

export * from './fsAsyncValidate.directive';
export * from './fsInput.directive';
export * from './fsform.directive';
@NgModule({
  imports: [
    CommonModule
],
declarations: [
  FsFormDirective,
  // FsInputDirective,
  // FsAsyncValidateDirective,
  FsControlDirective,
  FsRequiredDirective,
  FsMinDirective,
  FsMaxDirective
],
providers: [
  FsForm,
  FsFormDirective,
  // FsInputDirective,
  // FsAsyncValidateDirective,
  FsControlDirective,
  FsRequiredDirective,
  FsMinDirective,
  FsMaxDirective
],
exports: [
  FsFormDirective,
  // FsInputDirective,
  // FsAsyncValidateDirective,
  FsControlDirective,
  FsRequiredDirective,
  FsMinDirective,
  FsMaxDirective
]
})
export class FsFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsFormModule,
      providers: [
        FsFormDirective,
        // FsInputDirective,
        // FsAsyncValidateDirective,
        FsControlDirective,
        FsRequiredDirective,
        FsMinDirective,
        FsMaxDirective
      ]
    };
  }
}
