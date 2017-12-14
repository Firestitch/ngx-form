import { Injectable } from '@angular/core';
import { FsArray } from '@firestitch/common';
import { FsUtil } from '@firestitch/common';

@Injectable()
export class FsForm {

    constructor(private fsArray: FsArray, private fsUtil: FsUtil) {}

    renderErrors(instance, controlRef, renderer, elRef) {
        if (controlRef.dirty) {
            let parentNode = elRef.nativeElement.parentNode;

            // not the most elegant way to compile errors, but i couldnt get a better one working. right now its depepndant on styles/DOM we have in existing angular-material, which is not right
            let errorContainer = renderer.createElement('div');
            renderer.addClass(errorContainer, 'ng-trigger');
            renderer.addClass(errorContainer, 'ng-trigger-transitionMessages');
            for (const errKey in controlRef.errors) {

                if (!controlRef.errors[errKey]) {
                    continue;
                }

                let errorElement = renderer.createElement('mat-error');
                renderer.addClass(errorElement, 'mat-error')
                renderer.setProperty(errorElement, 'id', 'mat-error-' + errKey)
                let errorText;

                const messageVariable = `fs${this.capitalizeFirstLetter(errKey)}Message`;

                if (instance[messageVariable]) {
                    errorText = renderer.createText(this.parseErrorMessage(instance[messageVariable], controlRef.errors[errKey]));
                } else {
                    errorText = renderer.createText(controlRef.errors[errKey]);
                }

                renderer.appendChild(errorElement, errorText);
                renderer.appendChild(errorContainer, errorElement);
            }

            // searching for a container if we are at input element
            let errorPlaceholder = this.findClass(elRef.nativeElement.parentNode.parentNode.parentNode, 'mat-form-field-subscript-wrapper')

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
}
