import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsFormCommon } from './services/fsformcommon.service';
import { FsForm } from './services/fsform.service';

import { FsFormDirective } from './directives/fsform.directive';
import { FsControlDirective } from './directives/fscontrol.directive';
import { FsFormRequiredDirective } from './directives/fs-required.directive';
import { FsFormMinDirective } from './directives/min.directive';
import { FsFormMaxDirective } from './directives/max.directive';
import { FsFormMinLengthDirective } from './directives/minlength.directive';
import { FsFormMaxLengthDirective } from './directives/maxlength.directive';
import { FsFormEmailDirective } from './directives/email.directive';
import { FsFormEmailsDirective } from './directives/emails.directive';
import { FsFormPhoneDirective } from './directives/phone.directive';
import { FsFormCompareDirective } from './directives/compare.directive';
import { FsFormIntegerDirective } from './directives/integer.directive';
import { FsFormNumericDirective } from './directives/numeric.directive';
import { FsFormPatternDirective } from './directives/pattern.directive';
import { FsFormFunctionDirective} from './directives/function.directive';
import { FsFormDateRangeDirective } from './directives/daterange.directive';
import { FormRequiredDirective } from './directives/required.directive';
import { NestedLevel3Component } from './components/nested-level-3/nested-level-3.component';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NestedLevel4Component } from './components/nested-level-4/nested-level-4.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
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
    FsFormEmailsDirective,
    FsFormPhoneDirective,
    FsFormCompareDirective,
    FsFormIntegerDirective,
    FsFormNumericDirective,
    FsFormPatternDirective,
    FsFormFunctionDirective,
    FsFormDateRangeDirective,
    FormRequiredDirective,
    NestedLevel3Component,
    NestedLevel4Component
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
    FsFormEmailsDirective,
    FsFormPhoneDirective,
    FsFormCompareDirective,
    FsFormIntegerDirective,
    FsFormNumericDirective,
    FsFormPatternDirective,
    FsFormFunctionDirective,
    FsFormDateRangeDirective,
    FormRequiredDirective,
    NestedLevel3Component,
    NestedLevel4Component
  ],
  providers: [
    FsFormCommon,
    FsForm
  ],
})
export class FsFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsFormModule,
      providers: [
        FsFormCommon,
        FsForm
      ]
    };
  }
}
