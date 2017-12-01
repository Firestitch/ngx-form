import { AbstractControl, Validator } from '@angular/forms';
export declare class FsAsyncValidateDirective implements Validator {
    constructor();
    validate(c: AbstractControl): Promise<{}>;
}
