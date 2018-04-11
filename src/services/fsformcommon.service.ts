import { Injectable } from '@angular/core';
import { FsArray, FsUtil, FsValidate } from '@firestitch/common';

@Injectable()
export class FsFormCommon {

    constructor(private fsArray: FsArray, private fsUtil: FsUtil, private fsValidate: FsValidate) {}

    renderErrors(instance, controlRef, renderer, elRef) {
        if (controlRef.dirty) {
            let parentNode = elRef.nativeElement.parentNode;

            if (elRef.nativeElement.tagName === 'FS-CHECKBOX-GROUP') {

                elRef.nativeElement.name = elRef.nativeElement.getAttribute('name');

                let wraperContainer = renderer.createElement('div');
                renderer.addClass(wraperContainer, 'mat-input-subscript-wrapper');
                renderer.addClass(wraperContainer, 'mat-form-field-subscript-wrapper');

                let wraperExist = false;

                for (let i = 0; i < elRef.nativeElement.childNodes.length; i++) {
                    if (elRef.nativeElement.childNodes[i]['className'] && elRef.nativeElement.childNodes[i]['className'].match(/mat-input-subscript-wrapper/)) {
                        wraperExist = true;
                    }
                }

                if (!wraperExist) {
                    renderer.appendChild(elRef.nativeElement, wraperContainer);
                }
            }
            // not the most elegant way to compile errors, but i couldnt get a better one working. right now its depepndant on styles/DOM we have in existing angular-material, which is not right
            let errorContainer = renderer.createElement('div');
            renderer.addClass(errorContainer, 'ng-trigger');
            renderer.addClass(errorContainer, 'ng-trigger-transitionMessages');
            const errors = this.getErrors(instance, controlRef);
            for (const errKey in errors) {

                if (!errors[errKey]) {
                    continue;
                }

                let errorElement = renderer.createElement('mat-error');
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

            // searching for a container if we are at input element
            let elContainer = elRef.nativeElement.parentNode.parentNode.parentNode;
            if (['FS-CHECKBOX-GROUP', 'FS-RADIO-GROUP'].indexOf(elRef.nativeElement.tagName) !== -1) {
              elContainer = elRef.nativeElement;
            }

            let errorPlaceholder = this.findClass(elContainer, 'mat-form-field-subscript-wrapper');

            if (errorPlaceholder) {
                errorPlaceholder.innerHTML = '';
                errorPlaceholder.appendChild(errorContainer);
            }else {
                errorPlaceholder = renderer.createElement('div');
                renderer.addClass(errorPlaceholder, 'mat-form-field-subscript-wrapper');
                renderer.appendChild(errorPlaceholder, errorContainer);
                elRef.nativeElement.appendChild(errorPlaceholder);
            }
        }
    }

    getErrors(instance, controlRef) {

        let messagesOrder = [];

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

        for (let key in controlRef.control.errors) {
            return { [key]: controlRef.control.errors[key] };
        }

        return {};
    }

    parseErrorMessage(message, args): string {

        for (const key in args) {
            message = message.replace(/\$\(\d\)/, args[key])
        }
        return message;
    }

    findClass(element, className) {
        var foundElement = null, found;
        function recurse(element, className, found) {
            for (var i = 0; i < element.childNodes.length && !found; i++) {
                var el = element.childNodes[i];
                let classes;
                if (typeof el.className == 'string')
                    classes = el.className != undefined ? el.className.split(" ") : [];
                else classes = [];
                for (var j = 0, jl = classes.length; j < jl; j++) {
                    if (classes[j] == className) {
                        found = true;
                        foundElement = element.childNodes[i];
                        break;
                    }
                }
                if (found)
                    break;
                recurse(element.childNodes[i], className, found);
            }
        }
        recurse(element, className, false);
        return foundElement;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    searchIndex(data, item) {
        return this.fsArray.indexOf(data, value => {
            return JSON.stringify(value) === JSON.stringify(item);
        });
    }

    isInt(value) {
        return !this.fsUtil.string(value).length || this.fsUtil.isInt(value);
    }

    isNumeric(value) {
        return !this.fsUtil.string(value).length || this.fsUtil.isNumeric(value);
    }

    phone(value) {
        return this.fsValidate.phone(value);
    }

    email(value) {
        return this.fsValidate.email(value);
    }
}
