import { AbstractControl } from "@angular/forms";
import { isNumeric } from "@firestitch/common";
import { isEmpty } from 'lodash-es';


export function validatorNumeric(control: AbstractControl): { [key: string]: boolean } {

  if (isEmpty(control.value) || isNumeric(control.value)) {
      return null;
  } else {
      return { numeric: true }
  }
}