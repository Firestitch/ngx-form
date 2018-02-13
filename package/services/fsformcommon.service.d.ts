import { FsArray, FsUtil, FsValidate } from '@firestitch/common';
export declare class FsFormCommon {
    private fsArray;
    private fsUtil;
    private fsValidate;
    constructor(fsArray: FsArray, fsUtil: FsUtil, fsValidate: FsValidate);
    renderErrors(instance: any, controlRef: any, renderer: any, elRef: any): void;
    getErrors(instance: any, controlRef: any): {
        [x: number]: any;
    };
    parseErrorMessage(message: any, args: any): string;
    findClass(element: any, className: any): any;
    capitalizeFirstLetter(string: any): any;
    searchIndex(data: any, item: any): number;
    isInt(value: any): boolean;
    isNumeric(value: any): boolean;
    phone(value: any): boolean;
    email(value: any): boolean;
}
