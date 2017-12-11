import { FsAsyncValidateDirective } from './fsAsyncValidate.directive';
import { FsInputDirective } from './fsInput.directive';
import { FsFormDirective } from './fsform.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './fsAsyncValidate.directive';
export * from './fsInput.directive';
export * from './fsform.directive';
@NgModule({
  imports: [
    CommonModule
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsFormModule,
      providers: [
        FsFormDirective,
        FsInputDirective,
        FsAsyncValidateDirective
      ]
    };
  }
}
