import { FsAsyncValidateDirective } from './fsAsyncValidate.directive';
import { FsInputDirective } from './fsInput.directive';
import { FsFormDirective } from './fsform.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        FsFormDirective,
        FsInputDirective,
        FsAsyncValidateDirective
    ],
    providers: [
        FsFormDirective,
        FsInputDirective,
        FsAsyncValidateDirective
    ],
    exports: [
        FsFormDirective,
        FsInputDirective,
        FsAsyncValidateDirective
    ]
})
export class FsFormModule {

}
