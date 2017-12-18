import { FsInputDirective } from './fsInput.directive';
import { FsCommonModule } from '@firestitch/common';
import { FsForm } from './fsform.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FsFormDirective,
  FsControlDirective,
  FsFormRequiredDirective,
  FsFormMinDirective,
  FsFormMaxDirective,
  FsFormMinLengthDirective,
  FsFormMaxLengthDirective,
  FsFormEmailDirective,
  FsFormPhoneDirective,
  FsFormCompareDirective,
  FsFormIntegerDirective,
  FsFormNumericDirective,
  FsFormPatternDirective,
  FsFormValidateDirective,
  FsFormAsyncValidateDirective
} from './fsform.directive';

export * from './fsform.directive';
@NgModule({
  imports: [
    CommonModule,
    FsCommonModule
],
declarations: [
  FsFormDirective,
  FsControlDirective,
  FsFormRequiredDirective,
  FsFormMinDirective,
  FsFormMaxDirective,
  FsFormMinLengthDirective,
  FsFormMaxLengthDirective,
  FsFormEmailDirective,
  FsFormPhoneDirective,
  FsFormCompareDirective,
  FsFormIntegerDirective,
  FsFormNumericDirective,
  FsFormPatternDirective,
  FsFormValidateDirective,
  FsFormAsyncValidateDirective
],
providers: [
  FsForm,
  FsFormDirective
],
exports: [
  FsFormDirective,
  FsControlDirective,
  FsFormRequiredDirective,
  FsFormMinDirective,
  FsFormMaxDirective,
  FsFormMinLengthDirective,
  FsFormMaxLengthDirective,
  FsFormEmailDirective,
  FsFormPhoneDirective,
  FsFormCompareDirective,
  FsFormIntegerDirective,
  FsFormNumericDirective,
  FsFormPatternDirective,
  FsFormValidateDirective,
  FsFormAsyncValidateDirective
]
})
export class FsFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsFormModule,
      providers: [
        FsFormDirective,
        FsControlDirective,
        FsFormRequiredDirective,
        FsFormMinDirective,
        FsFormMaxDirective,
        FsFormMinLengthDirective,
        FsFormMaxLengthDirective,
        FsFormEmailDirective,
        FsFormPhoneDirective,
        FsFormCompareDirective,
        FsFormIntegerDirective,
        FsFormNumericDirective,
        FsFormPatternDirective,
        FsFormValidateDirective,
        FsFormAsyncValidateDirective
      ]
    };
  }
}
