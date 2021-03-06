import { Observable } from 'rxjs';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export declare interface FsAsyncValidator {
  /**
   * @description
   * Method that performs async validation against the provided control.
   *
   * @param control The control to validate against.
   *
   * @returns A promise or observable that resolves a map of validation errors
   * if validation fails, otherwise null.
   */
  validateAsync(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
}
