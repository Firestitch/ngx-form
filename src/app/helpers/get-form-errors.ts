import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';


export function getFormErrors(control: AbstractControl, key: string): ValidationErrors | null {
  let errors: ValidationErrors | null = null;

  if (control.invalid && control.errors) {
    errors = {
      [key]: { ...control.errors },
    };
  }

  if (control instanceof FormGroup) {
    Object.entries(control.controls)
      .forEach(([name, childControl]) => {
        const childErrors = getFormErrors(childControl, name);

        if (childErrors) {
          if (!errors) {
            errors = { ...childErrors };
          } else {
            Object.assign(errors, childErrors);
          }
        }
      });
  }

  return errors;
}
