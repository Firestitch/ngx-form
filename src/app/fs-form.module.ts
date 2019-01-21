import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsFormCommon } from './services/fsformcommon.service';
import { FsForm } from './services/fsform.service';

import { FsFormDirective } from './directives/fsform.directive';
import { FsControlDirective } from './directives/fscontrol.directive';
import { FsFormRequiredDirective } from './directives/required.directive';
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


@NgModule({
  imports: [
    CommonModule
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
    FsFormDateRangeDirective
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
    FsFormDateRangeDirective
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
