import { AbstractControl } from "@angular/forms";
import { isNumeric } from "@firestitch/common";


export function validatorNumeric(control: AbstractControl): { [key: string]: boolean } {
  if (isNumeric(control.value)) {
      return null;
  } else {
      return { numeric: true }
  }
}