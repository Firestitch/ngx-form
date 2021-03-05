import { AbstractControl, ValidationErrors } from '@angular/forms';
import { email, isEmpty, isNumeric, phone, url } from '@firestitch/common';
import { isValid } from 'date-fns';
import { isObject } from 'lodash-es';

export class FsValidators {

  static email(control: AbstractControl): ValidationErrors | null {
    if (!control.value || email(control.value)) {
      return null;
    }

    return { email: true };
  }

  static emails(control: AbstractControl): ValidationErrors | null {
    const model = control.value || '';

    const hasInvalidEmails = model
      .split(',')
      .some((part) => !email(part));

    return hasInvalidEmails ? { email: true } : null;
  }

  static numeric(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value) || isNumeric(control.value)) {
      return null;
    } else {
      return { numeric: true }
    }
  }

  static integer(control: AbstractControl): ValidationErrors | null {
    if (!control.value || String(control.value) === '' || (control.value % 1 === 0)) {
      return null;
    } else {
      return { integer: true }
    }
  }

  static phone(control: AbstractControl): ValidationErrors | null {
    if (!control.value || phone(control.value)) {
      return null;
    }

    return { phone: true };
  }

  static url(control: AbstractControl): ValidationErrors | null {
    if (!control.value || url(control.value)) {
      return null;
    }

    return { url: true };
  }

  static dateRange(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    if (isObject(control.value)) {

      const start = control.value.start;
      const end = control.value.end;

      if ((!start && !end) || (isValid(start) && isValid(end))) {
        return null;
      }
    }

    return { dateRange: true };
  }

  static func(control: AbstractControl, formFunction, data: any) {
    // Must use redundant variable because without that will angular compile error
    const res = new Promise((resolve) => {
      try {
        const result = formFunction(control, data);
        if (result instanceof Promise) {
          result.then(() => {
            return resolve(null);
          })
            .catch((err) => {
              return resolve({ validationError: err });
            });
        } else {
          return resolve(null);
        }
      } catch (e) {
        e = e instanceof Error ? e.message : e;
        resolve({ validationError: e });
      }
    });

    return res;
  }

  // static compare(a, b): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (a === b) {
  //       return null;
  //     } else {
  //       return { compare: true };
  //     }
  //   }
  // }
}
