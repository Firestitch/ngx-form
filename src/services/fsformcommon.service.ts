import { Injectable } from '@angular/core';
import { phone } from '@firestitch/common/validate/phone';
import { email } from '@firestitch/common/validate/email';
import { toString, isInteger, isNumber, isString, isEmpty, isFinite, filter } from 'lodash';

@Injectable()
export class FsFormCommon {

    constructor() {}

    renderErrors(instance, controlRef, renderer, elRef) {
        if (controlRef.dirty) {
            const errors = this.getErrors(instance, controlRef);
            const isRadioGroup = elRef.nativeElement.tagName==='FS-RADIO-GROUP';
            const isCheckGroup = elRef.nativeElement.tagName==='FS-CHECKBOX-GROUP';

            // searching for a container if we are at input element (.mat-input-wrapper or .mat-form-field-wrapper)
            let elContainer = elRef.nativeElement.parentNode.parentNode.parentNode;
            if (isRadioGroup || isCheckGroup) {
              elContainer = elRef.nativeElement;
            }

            let wrapperClass = 'mat-form-field-subscript-wrapper';

            if (isRadioGroup) {
              wrapperClass = 'mat-radio-button-group-subscript-wrapper';
            } else if (isCheckGroup) {
              wrapperClass = 'mat-checkbox-group-subscript-wrapper';
            }
            
            let wrapper = elContainer.querySelector('.' + wrapperClass);

            if (wrapper) {

              if (isEmpty(errors)) {
                return renderer.setStyle(wrapper, 'display', 'none');
              } else {
                renderer.setStyle(wrapper, 'display', 'block');
              }
            }

            // not the most elegant way to compile errors, but i couldnt get a better one working.
            // right now its depepndant on styles/DOM we have in existing angular-material, which is not right
            const errorContainer = renderer.createElement('div');
            renderer.addClass(errorContainer, 'ng-trigger');
            renderer.addClass(errorContainer, 'ng-trigger-transitionMessages');            

            // For checkbox and radio button groups we have to manually add these wrappers
            if (isRadioGroup || isCheckGroup) {

                elRef.nativeElement.name = elRef.nativeElement.getAttribute('name');

                if (!wrapper) {
                  wrapper = renderer.createElement('div');
                  
                  renderer.addClass(wrapper, 'mat-form-field-subscript-wrapper');
                  renderer.addClass(wrapper, wrapperClass);
                  renderer.appendChild(elRef.nativeElement, wrapper);
                }
            } else {
              if (!wrapper) {
                wrapper = renderer.createElement('div');
                renderer.addClass(wrapper, 'mat-form-field-subscript-wrapper');
                renderer.appendChild(wrapper, errorContainer);
                elRef.nativeElement.appendChild(wrapper);
              }
            }

            for (const errKey in errors) {

                if (!errors[errKey]) {
                    continue;
                }

                const errorElement = renderer.createElement('mat-error');
                renderer.addClass(errorElement, 'mat-error')
                renderer.setProperty(errorElement, 'id', 'mat-error-' + errKey)
                let errorText;

                const messageVariable = `fsForm${this.capitalizeFirstLetter(errKey)}Message`;

                if (instance[messageVariable]) {
                    errorText = renderer.createText(this.parseErrorMessage(instance[messageVariable], errors[errKey]));
                } else {
                    errorText = renderer.createText(errors[errKey]);
                }

                renderer.appendChild(errorElement, errorText);
                renderer.appendChild(errorContainer, errorElement);
            }

            wrapper.innerHTML = '';
            wrapper.appendChild(errorContainer);        
        }
    }

    getErrors(instance, controlRef) {

        const messagesOrder = [];

        for (const value of instance.fsFormErrorsOrder) {
            messagesOrder.push(value.replace(/fsForm/, '').toLowerCase());
        }

        if (messagesOrder.length) {
            for (const value of messagesOrder) {
                if (controlRef.control.errors[value]) {
                    return { [value]: controlRef.control.errors[value] };
                }
            }
        }

        // seems a bit hacky
        for (let key in controlRef.control.errors) {
            return { [key]: controlRef.control.errors[key] };
        }

        return {};
    }

    parseErrorMessage(message, args): string {

        for (const key in args) {
            message = message.replace(/\$\(\d\)/, args[key]);
        }
        return message;
    }

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    searchIndex(data, item) {
      return filter(data, value => {
        return JSON.stringify(value) === JSON.stringify(item);
      });
    }

    isInt(value) {
      return this.string(value) === '' || (this.isNumeric(value) && value % 1 === 0);
    }

    isNumeric(value) {
      return this.string(value) === '' || (this.string(value).length && !!this.string(value).match(/^-?\d*\.?\d*$/));
    }

    phone(value) {
      return phone(value);
    }

    email(value) {
      return email(value);
    }

    private string(value) {

      if (value === null || value === undefined) {
        value = '';
      }

      return value.toString();
    }
}
