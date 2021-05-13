import { AbstractControl, ValidationErrors } from '@angular/forms';
import { email, isEmpty, isNumeric, phone, url } from '@firestitch/common';
import { isValid } from 'date-fns';
import { isObject } from 'lodash-es';
import { catchError, map, take } from 'rxjs/operators';
import { from, isObservable, Observable, of, throwError } from 'rxjs';

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

  static url(control: AbstractControl, protocolRequired = false): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    if (!url(control.value)) {
      return { url: true };
    }

    if (protocolRequired) {
      const pattern = new RegExp(/^http(s)?:\/\//gm);

      if (!String(control.value).match(pattern)) {
        return { urlProtocol: true };
      }
    }

    return null;
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
    let result: unknown;
    let stream$: Observable<unknown>

    try {
      result = formFunction(control, data);
    } catch (err) {
      err = err instanceof Error ? err.message : err;

      stream$ = throwError(err);
    }

    if (!stream$) {
      if (result instanceof Promise) {
        stream$ = from(result)
      } else if (isObservable(result)) {
        stream$ = result;
      } else {
        stream$ = of(null);
      }
    }

    return stream$
      .pipe(
        map(() => null),
        catchError((err) => {
          return of({ validationError: err });
        }),
        take(1),
      );
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
