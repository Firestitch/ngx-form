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
            const isCheckRadioGroup = ['FS-CHECKBOX-GROUP', 'FS-RADIO-GROUP'].indexOf(elRef.nativeElement.tagName) >= 0;

            // searching for a container if we are at input element (.mat-input-wrapper or .mat-form-field-wrapper)
            let elContainer = elRef.nativeElement.parentNode.parentNode.parentNode;
            if (isCheckRadioGroup) {
              elContainer = elRef.nativeElement;
            }

            const wrapper = elContainer.querySelector('.mat-form-field-subscript-wrapper');

            if (wrapper) {

              if (isEmpty(errors)) {
                return renderer.setStyle(wrapper, 'display', 'none');
              } else {
                renderer.setStyle(wrapper, 'display', 'block');
              }
            }

            // For checkbox and radio button groups we have to manually add these wrappers
            if (isCheckRadioGroup) {

                elRef.nativeElement.name = elRef.nativeElement.getAttribute('name');

                if (!wrapper) {
                  const wraperContainer = renderer.createElement('div');
                  renderer.addClass(wraperContainer, 'mat-input-subscript-wrapper');
                  renderer.addClass(wraperContainer, 'mat-form-field-subscript-wrapper');
                  renderer.appendChild(elRef.nativeElement, wraperContainer);
                }
            }

            // not the most elegant way to compile errors, but i couldnt get a better one working.
            // right now its depepndant on styles/DOM we have in existing angular-material, which is not right
            const errorContainer = renderer.createElement('div');
            renderer.addClass(errorContainer, 'ng-trigger');
            renderer.addClass(errorContainer, 'ng-trigger-transitionMessages');

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

            // I feel like this area needs some attention.
            let errorPlaceholder = elContainer.querySelector('.mat-form-field-subscript-wrapper');

            if (errorPlaceholder) {
                errorPlaceholder.innerHTML = '';
                errorPlaceholder.appendChild(errorContainer);
            } else {
                errorPlaceholder = renderer.createElement('div');
                renderer.addClass(errorPlaceholder, 'mat-form-field-subscript-wrapper');
                renderer.appendChild(errorPlaceholder, errorContainer);
                elRef.nativeElement.appendChild(errorPlaceholder);
            }
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

    findClass(element, className) {
        var foundElement = null, found;
        function recurse(element, className, found) {
            for (var i = 0; i < element.childNodes.length && !found; i++) {
                var el = element.childNodes[i];
                let classes;
                if (typeof el.className == 'string') {
                    classes = el.className != undefined ? el.className.split(" ") : [];
                } else  {
                  classes = [];
                }
                for (var j = 0, jl = classes.length; j < jl; j++) {
                    if (classes[j] == className) {
                        found = true;
                        foundElement = element.childNodes[i];
                        break;
                    }
                }
                if (found) {
                    break;
                }
                recurse(element.childNodes[i], className, found);
            }
        }
        recurse(element, className, false);
        return foundElement;
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
