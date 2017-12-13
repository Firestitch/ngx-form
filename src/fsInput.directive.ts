import { Observable } from 'rxjs/Observable';
import { Input, OnInit, Directive, ElementRef, Renderer2, ViewContainerRef, forwardRef } from '@angular/core';
import { FormControl, NgControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[fs-input]'
})
export class FsInputDirective implements OnInit {
    validators: ValidatorFn[] = [];
    asyncValidators: any;

    @Input() fsRequiredMessage = 'This field is required.';
    @Input() fsEmailMessage = 'This is not a valid email address.';
    @Input() fsNumericMessage = 'Value should be numeric.';
    @Input() fsIntegerMessage = 'Value should be an integer.';
    @Input() fsMinMessage = 'Should not be less than $(1).';
    @Input() fsMaxMessage = 'Should not be bigger than $(1).';
    @Input() fsMinlengthMessage = 'Should not be shorter than $(1) characters.';
    @Input() fsMaxlengthMessage = 'Should not be longer than $(1) characters.';
    @Input() fsCompareMessage = 'Inputs do not match.';

    @Input() set fsMax(length: number) {
        this.validators.push(Validators.max(length));
    }

    @Input() set fsMin(length: number) {
        this.validators.push(Validators.min(length));
    }

    @Input() set fsMinLength(length: number) {
        this.validators.push(Validators.minLength(length));
    }

    @Input() set fsMaxLength(length: number) {
        this.validators.push(Validators.maxLength(length));
    }

    @Input() set fsEmail(length: number) {
        this.validators.push(Validators.email);
    }

    @Input() set fsCompare(formControl) {
        this.validators.push(() => {
            if (formControl.value === this.elRef.nativeElement.value) {
                return null;
            } else {
                return { compare: true };
            }
        });
    }

    @Input() set fsInteger(apply: boolean) {
        if (apply) {
            this.validators.push((control: AbstractControl): { [key: string]: boolean } => {
                if (!control.value || (!control.value.length || (parseInt(control.value) || control.value === '0'))) {
                    return null;
                } else {
                    return { integer: true }
                }
            });
        }
    }
    /*
    @Input() set fsRequired(apply: boolean) {
        if (apply) {
            this.validators.push(Validators.required);
        }
    }
    */

    @Input() set fsNumeric(apply: boolean) {
        if (apply) {
            this.validators.push((control: AbstractControl): { [key: string]: boolean } => {
                if (!control.value || (!control.value.length || (parseFloat(control.value) || control.value === '0'))) {
                    return null;
                } else {
                    return { numeric: true }
                }
            });
        }
    }

    @Input() set fsValidatePattern(pattern: RegExp) {
        this.validators.push(Validators.pattern(pattern));
    }

    /* validator function should return either a null (or false) OR error message string */
    @Input() set fsValidate(validator: any) {
        this.validators.push(validator);
    }

    /* 
        how to use async validators: https://netbasal.com/angular-2-forms-create-async-validator-directive-dd3fd026cb45
        mention that in control you have access to all the controls in the form through parent, so you can validate multiple values
    */
    @Input() set fsAsyncValidate(validator:
        Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
    ) {
        this.asyncValidators = validator;
    }

    constructor(
        private elRef: ElementRef,
        private controlRef: NgControl,
        private renderer: Renderer2,
        private viewContainer: ViewContainerRef
    ) {
    }

    ngOnInit() {
        this.controlRef.control.setValidators(this.validators);
        if (this.asyncValidators) {
            this.controlRef.control.setAsyncValidators(this.asyncValidators);
        }

        this.controlRef.control.statusChanges.subscribe(res => {
            this.renderErrors();
        })
    }

    renderErrors() {
        if (this.controlRef.dirty) {
            let parentNode = this.elRef.nativeElement.parentNode;

            // not the most elegant way to compile errors, but i couldnt get a better one working. right now its depepndant on styles/DOM we have in existing angular-material, which is not right
            let errorContainer = this.renderer.createElement('div');
            this.renderer.addClass(errorContainer, 'ng-trigger');
            this.renderer.addClass(errorContainer, 'ng-trigger-transitionMessages');
            for (const errKey in this.controlRef.errors) {

                if (!this.controlRef.errors[errKey]) {
                    continue;
                }

                let errorElement = this.renderer.createElement('mat-error');
                this.renderer.addClass(errorElement, 'mat-error')
                this.renderer.setProperty(errorElement, 'id', 'mat-error-' + errKey)
                let errorText;

                const messageVariable = `fs${this.capitalizeFirstLetter(errKey)}Message`;

                if (this[messageVariable]) {
                    errorText = this.renderer.createText(this.parseErrorMessage(this[messageVariable], this.controlRef.errors[errKey]));
                } else {
                    errorText = this.renderer.createText(this.controlRef.errors[errKey]);
                }

                this.renderer.appendChild(errorElement, errorText);
                this.renderer.appendChild(errorContainer, errorElement);
            }

            // searching for a container if we are at input element
            let errorPlaceholder = this.findClass(this.elRef.nativeElement.parentNode.parentNode.parentNode, 'mat-form-field-subscript-wrapper')

            if (errorPlaceholder) {
                errorPlaceholder.innerHTML = '';
                errorPlaceholder.appendChild(errorContainer);
            }else {
                errorPlaceholder = this.renderer.createElement('div');
                this.renderer.addClass(errorPlaceholder, 'mat-form-field-subscript-wrapper');
                this.renderer.appendChild(errorPlaceholder, errorContainer);
                this.elRef.nativeElement.appendChild(errorPlaceholder);
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
}