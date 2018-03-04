import { FsCommonModule } from '@firestitch/common';
import { FsFormCommon } from './services/fsformcommon.service';
import { FsForm } from './services/fsform.service';
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
} from './directives';

@NgModule({
  imports: [
    CommonModule,
    FsCommonModule
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
  ],
  entryComponents: [
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
})
export class FsFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsFormModule,
      providers: [
        FsFormCommon,
        FsForm,
        FsFormDirective
      ]
    };
  }
}
