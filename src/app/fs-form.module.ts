import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FsForm } from './services/fsform.service';

import { FsFormDirective } from './directives/form.directive';
import { FsControlDirective } from './directives/control.directive';
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
import { FsFormUrlDirective } from './directives/url.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
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
    FsFormUrlDirective,
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
    FsFormUrlDirective,
  ],
  providers: [
    FsForm
  ],
})
export class FsFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsFormModule,
      providers: [
        FsForm
      ]
    };
  }
}
