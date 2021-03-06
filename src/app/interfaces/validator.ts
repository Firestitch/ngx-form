import { AbstractControl, ValidationErrors } from '@angular/forms';

export declare interface FsValidator {
  /**
   * @description
   * Method that performs synchronous validation against the provided control.
   *
   * @param control The control to validate against.
   *
   * @returns A map of validation errors if validation fails,
   * otherwise null.
   */

  validate(control: AbstractControl): ValidationErrors | null;

}
