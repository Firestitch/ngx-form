import { FsInputDirective } from './fsInput.directive';
import { FsCommonModule } from '@firestitch/common';
import { FsFormCommon } from './fsformcommon.service';
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
  FsFormFunctionDirective
} from './fsform.directive';

export * from './fsform.directive';
export * from './fsform.service';

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
  FsFormFunctionDirective
],
providers: [
  FsFormCommon,
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
  FsFormFunctionDirective
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
        FsFormFunctionDirective,
        FsForm
      ]
    };
  }
}
