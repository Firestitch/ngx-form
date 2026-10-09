import { Component, Directive, forwardRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AbstractControl, FormsModule, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { FsMessageModule } from '@firestitch/message';

import { FsFormDirective } from '../src/app/directives/form/form.directive';
import { FsFormNoFsValidatorsDirective } from '../src/app/directives/validators/no-fs-validators.directive';


/**
 * Stands in for a custom control that brings its own validator, the way fsDatePickerBirthday
 * does: provided as NG_VALIDATORS, so it only reaches the FormControl when NgForm registers it.
 */
@Directive({
  selector: '[stubValidated]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => StubValidatedDirective), multi: true },
  ],
})
class StubValidatedDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return control.value === 'bad' ? { stubInvalid: 'Stub message' } : null;
  }
}

/**
 * Reproduces IEB-T254: an optional field inside <form fsForm> whose only validator is the
 * control's own NG_VALIDATORS. FsFormNoFsValidatorsDirective asked for a validator in
 * ngAfterContentInit, before NgForm.addControl()'s microtask had put it on the control, so it
 * never subscribed and the message was never rendered — only Material's red outline showed.
 */
@Component({
  standalone: true,
  imports: [
    FormsModule,
    FsFormDirective,
    FsFormNoFsValidatorsDirective,
    MatFormFieldModule,
    MatInputModule,
    StubValidatedDirective,
  ],
  template: `
    <form fsForm>
      <mat-form-field class="validated">
        <mat-label>Validated</mat-label>
        <input matInput name="validated" [(ngModel)]="validated" stubValidated>
      </mat-form-field>
      <mat-form-field class="plain">
        <mat-label>Plain</mat-label>
        <input matInput name="plain" [(ngModel)]="plain">
      </mat-form-field>
    </form>
  `,
})
class HostComponent {
  public validated: string;
  public plain: string;
}

describe('FsFormNoFsValidatorsDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, NoopAnimationsModule, FsMessageModule.forRoot()],
      providers: [
        provideRouter([]),
        provideToastr(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  function typeInto(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
  }

  function inputOf(selector: string): HTMLInputElement {
    return fixture.nativeElement.querySelector(`mat-form-field.${selector} input`);
  }

  function subscriptOf(selector: string): Element {
    return fixture.nativeElement
      .querySelector(`mat-form-field.${selector} .mat-mdc-form-field-subscript-wrapper`);
  }

  it('renders the message of a validator the control brings itself', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    typeInto(inputOf('validated'), 'bad');
    tick();
    fixture.detectChanges();

    expect(subscriptOf('validated').querySelector('.fs-form-error')?.textContent)
      .withContext('the NG_VALIDATORS message should be rendered under the field')
      .toContain('Stub message');
  }));

  it('still leaves a field with no validators alone', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    typeInto(inputOf('plain'), 'anything');
    tick();
    fixture.detectChanges();

    expect(subscriptOf('plain').classList.contains('fs-form-message'))
      .withContext('a field with no validators should never be bound (SP-T2996)')
      .toBe(false);
  }));
});
