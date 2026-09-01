import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { FsMessageModule } from '@firestitch/message';

import { FsFormDirective } from '../src/app/directives/form/form.directive';
import { FsFormUrlDirective } from '../src/app/directives/validators/url.directive';


/**
 * Reproduces CC-T1608: a field is destroyed and re-created (lazy tab content),
 * so a second NgModel registers under a name the FormGroup already holds.
 * FormGroup.registerControl() hands back the EXISTING control and NgForm
 * reassigns dir.control to it — leaving FsControlDirective subscribed to the
 * control it cached in its constructor, which never emits again.
 */
@Component({
  standalone: true,
  imports: [FormsModule, FsFormDirective, FsFormUrlDirective, MatFormFieldModule, MatInputModule],
  template: `
    <form fsForm>
      @if (showFirst) {
        <mat-form-field>
          <mat-label>URL</mat-label>
          <input matInput name="URL" [(ngModel)]="first" [fsFormUrl]="true" [fsFormUrlProtocol]="true">
        </mat-form-field>
      }
      @if (showSecond) {
        <mat-form-field>
          <mat-label>URL</mat-label>
          <input matInput name="URL" [(ngModel)]="second" [fsFormUrl]="true" [fsFormUrlProtocol]="true">
        </mat-form-field>
      }
    </form>
  `,
})
class HostComponent {
  public showFirst = true;
  public showSecond = false;
  public first: string;
  public second: string;
}

describe('FsControlDirective re-registration', () => {
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

  function subscriptOf(field: Element): Element {
    return field.querySelector('.mat-mdc-form-field-subscript-wrapper');
  }

  it('renders the validation message on a field created while the name is free', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    typeInto(input, 'google.com');
    tick();
    fixture.detectChanges();

    const field = fixture.nativeElement.querySelector('mat-form-field');
    const subscript = subscriptOf(field);

    expect(subscript.classList.contains('fs-form-message'))
      .withContext('render() should have run and marked the subscript wrapper')
      .toBe(true);
    expect(subscript.querySelector('.fs-form-error')?.textContent)
      .withContext('the validation message should be rendered')
      .toContain('Invalid URL');
  }));

  it('renders the validation message on a field created while the name is TAKEN', fakeAsync(() => {
    // Both fields alive at once under the same name: the second one gets handed
    // back the first one's control by FormGroup.registerControl().
    fixture.componentInstance.showSecond = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toBe(2);

    typeInto(inputs[1], 'google.com');
    tick();
    fixture.detectChanges();

    const field = fixture.nativeElement.querySelectorAll('mat-form-field')[1];
    const subscript = subscriptOf(field);

    expect(subscript.classList.contains('fs-form-message'))
      .withContext('render() never ran: FsForm is subscribed to an orphaned control')
      .toBe(true);
    expect(subscript.querySelector('.fs-form-error')?.textContent)
      .withContext('the validation message should be rendered')
      .toContain('Invalid URL');
  }));
});
