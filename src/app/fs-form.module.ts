import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroupDirective, FormsModule, NgForm } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

import { FsFormDirective } from './directives/form/form.directive';
import { FsControlDirective } from './directives/validators/control.directive';
import { FsFormRequiredDirective } from './directives/validators/required.directive';
import { FsFormMinDirective } from './directives/validators/min.directive';
import { FsFormMaxDirective } from './directives/validators/max.directive';
import { FsFormMinLengthDirective } from './directives/validators/minlength.directive';
import { FsFormMaxLengthDirective } from './directives/validators/maxlength.directive';
import { FsFormEmailDirective } from './directives/validators/email.directive';
import { FsFormEmailsDirective } from './directives/validators/emails.directive';
import { FsFormPhoneDirective } from './directives/validators/phone.directive';
import { FsFormCompareDirective } from './directives/validators/compare.directive';
import { FsFormIntegerDirective } from './directives/validators/integer.directive';
import { FsFormNumericDirective } from './directives/validators/numeric.directive';
import { FsFormPatternDirective } from './directives/validators/pattern.directive';
import { FsFormFunctionDirective } from './directives/validators/function.directive';
import { FsFormGreaterDirective } from './directives/validators/greater.directive';
import { FsFormDateRangeDirective } from './directives/validators/daterange.directive';
import { FsFormLesserDirective } from './directives/validators/lesser.directive';
import { FsFormUrlDirective } from './directives/validators/url.directive';
import { FsFormDialogCloseDirective } from './directives/form-dialog-close.directive';
import { FsButtonDirective } from './directives/button.directive';
import { FsFormValidateDirective } from './directives/validators/validate.directive';
import { FsFormDialogActionsComponent } from './components/form-dialog-actions/form-dialog-actions.component';
import { FsFormNoFsValidatorsDirective } from './directives/validators/no-fs-validators.directive';
import { FsFormGreaterEqualDirective, FsFormLesserEqualDirective, FsFormTemplateDirective, FsSubmitButtonDirective } from './directives';
import { FsFormTemplateComponent, FsFormTemplateOutletComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatDialogModule,
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
  ],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher,
    },
  ],
})
export class FsFormModule {
  static forRoot(): ModuleWithProviders<FsFormModule> {

    /**
     * Hack: https://github.com/angular/components/issues/20097
     */
    ErrorStateMatcher.prototype.isErrorState = (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return control?.invalid && control?.touched && control?.dirty;
    };

    return {
      ngModule: FsFormModule,
    };
  }
}
