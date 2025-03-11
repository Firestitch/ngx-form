import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormGroupDirective, FormsModule, NgForm, UntypedFormControl } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { FsDialogModule } from '@firestitch/dialog';

import {
  FsFormDialogActionsComponent,
  FsFormTemplateComponent, FsFormTemplateOutletComponent,
} from './components';
import {
  FsFormGreaterEqualDirective, FsFormLesserEqualDirective,
  FsFormTemplateDirective, FsSubmitButtonDirective,
} from './directives';
import { FsButtonDirective } from './directives/button.directive';
import { FsFormDialogCloseDirective } from './directives/form-dialog-close.directive';
import { FsFormGroupDirective } from './directives/form-group/form-group.directive';
import { FsFormDirective } from './directives/form/form.directive';
import { FsFormCompareDirective } from './directives/validators/compare.directive';
import { FsControlDirective } from './directives/validators/control.directive';
import { FsFormDateRangeDirective } from './directives/validators/daterange.directive';
import { FsFormEmailDirective } from './directives/validators/email.directive';
import { FsFormEmailsDirective } from './directives/validators/emails.directive';
import { FsFormFunctionDirective } from './directives/validators/function.directive';
import { FsFormGreaterDirective } from './directives/validators/greater.directive';
import { FsFormIntegerDirective } from './directives/validators/integer.directive';
import { FsFormLesserDirective } from './directives/validators/lesser.directive';
import { FsFormMaxDirective } from './directives/validators/max.directive';
import { FsFormMaxLengthDirective } from './directives/validators/maxlength.directive';
import { FsFormMinDirective } from './directives/validators/min.directive';
import { FsFormMinLengthDirective } from './directives/validators/minlength.directive';
import { FsFormNoFsValidatorsDirective } from './directives/validators/no-fs-validators.directive';
import { FsFormNumericDirective } from './directives/validators/numeric.directive';
import { FsFormPatternDirective } from './directives/validators/pattern.directive';
import { FsFormPhoneDirective } from './directives/validators/phone.directive';
import { FsFormRequiredDirective } from './directives/validators/required.directive';
import { FsFormUrlDirective } from './directives/validators/url.directive';
import { FsFormValidateDirective } from './directives/validators/validate.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatDialogModule,
    MatDialogModule,

    FsDialogModule,
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
    FsFormGreaterDirective,
    FsFormGreaterEqualDirective,
    FsFormLesserDirective,
    FsFormLesserEqualDirective,
    FsFormUrlDirective,
    FsFormDialogCloseDirective,
    FsFormValidateDirective,
    FsFormDialogActionsComponent,
    FsFormNoFsValidatorsDirective,
    FsButtonDirective,
    FsSubmitButtonDirective,
    FsFormTemplateComponent,
    FsFormTemplateDirective,
    FsFormTemplateOutletComponent,
    FsFormGroupDirective,
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
    FsFormGreaterDirective,
    FsFormGreaterEqualDirective,
    FsFormLesserDirective,
    FsFormLesserEqualDirective,
    FsFormUrlDirective,
    FsFormDialogCloseDirective,
    FsFormValidateDirective,
    FsFormDialogActionsComponent,
    FsFormNoFsValidatorsDirective,
    FsButtonDirective,
    FsSubmitButtonDirective,
    FsFormTemplateComponent,
    FsFormTemplateDirective,
    FsFormTemplateOutletComponent,
    FsFormGroupDirective,
  ],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher,
    },
  ],
})
export class FsFormModule {
  public static forRoot(): ModuleWithProviders<FsFormModule> {

    /**
     * Hack: https://github.com/angular/components/issues/20097
     */
    ErrorStateMatcher.prototype
      .isErrorState = (
        control: UntypedFormControl | null, 
        form: FormGroupDirective | NgForm | null,
      ): boolean => {
        return control?.invalid && control?.touched && control?.dirty;
      };

    return {
      ngModule: FsFormModule,
    };
  }
}
