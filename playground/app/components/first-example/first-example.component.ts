import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioButton } from '@angular/material/radio';

import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { filter } from '@firestitch/common';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsFormDirective } from '@firestitch/form';
import { FsMessage } from '@firestitch/message';
import { FsPhoneModule } from '@firestitch/phone';
import { FsRadioGroupModule } from '@firestitch/radiogroup';

import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { FsButtonDirective } from '../../../../src/app/directives/button.directive';
import { FsFormDirective as FsFormDirective_1 } from '../../../../src/app/directives/form/form.directive';
import { FsFormCompareDirective } from '../../../../src/app/directives/validators/compare.directive';
import { FsFormEmailDirective } from '../../../../src/app/directives/validators/email.directive';
import { FsFormGreaterEqualDirective } from '../../../../src/app/directives/validators/greater-equal.directive';
import { FsFormGreaterDirective } from '../../../../src/app/directives/validators/greater.directive';
import { FsFormIntegerDirective } from '../../../../src/app/directives/validators/integer.directive';
import { FsFormLesserEqualDirective } from '../../../../src/app/directives/validators/lesser-equal.directive';
import { FsFormLesserDirective } from '../../../../src/app/directives/validators/lesser.directive';
import { FsFormMaxDirective } from '../../../../src/app/directives/validators/max.directive';
import { FsFormMaxLengthDirective } from '../../../../src/app/directives/validators/maxlength.directive';
import { FsFormMinDirective } from '../../../../src/app/directives/validators/min.directive';
import { FsFormMinLengthDirective } from '../../../../src/app/directives/validators/minlength.directive';
import { FsFormNoFsValidatorsDirective } from '../../../../src/app/directives/validators/no-fs-validators.directive';
import { FsFormNumericDirective } from '../../../../src/app/directives/validators/numeric.directive';
import { FsFormPatternDirective } from '../../../../src/app/directives/validators/pattern.directive';
import { FsFormPhoneDirective } from '../../../../src/app/directives/validators/phone.directive';
import { FsFormRequiredDirective } from '../../../../src/app/directives/validators/required.directive';
import { FsFormUrlDirective } from '../../../../src/app/directives/validators/url.directive';


@Component({
  selector: 'first-example',
  templateUrl: './first-example.component.html',
  styleUrls: ['./first-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    FsFormDirective_1,
    FsRadioGroupModule,
    FsFormRequiredDirective,
    MatRadioButton,
    FsCheckboxGroupModule,
    MatCheckbox,
    MatHint,
    FsAutocompleteChipsModule,
    MatFormField,
    MatLabel,
    MatInput,
    FsFormCompareDirective,
    FsFormNumericDirective,
    FsFormIntegerDirective,
    FsFormEmailDirective,
    FsPhoneModule,
    FsFormPhoneDirective,
    FsFormUrlDirective,
    FsFormGreaterDirective,
    FsFormGreaterEqualDirective,
    FsFormLesserDirective,
    FsFormNoFsValidatorsDirective,
    FsFormLesserEqualDirective,
    FsFormMinDirective,
    FsFormMaxDirective,
    FsFormMinLengthDirective,
    FsFormMaxLengthDirective,
    FsFormPatternDirective,
    FsDatePickerModule,
    MatButton,
    FsButtonDirective,
  ],
})
export class FirstExampleComponent {

  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  public required = true;
  public hidden = false;
  public render = true;
  public validations = true;
  public lengthInput = '';
  public datepicker = null;
  public checkbox: any[] = [];
  public password = null;
  public passwordConfirm = null;
  public emails = null;
  public phone = null;
  public url = null;
  public numeric = null;
  public daterange = null;
  public startDate = null;
  public endDate = null;
  public pattern = null;
  public email = null;
  public integer = null;
  public chips = [];
  public minMaxInput = null;
  public radioRequired = null;
  public skeleton;
  public greaterInput;
  public model: any = {};
  public disabled = false;
  public maxLengthInput;
  public minLengthInput;
  public selectedAccounts = [];
  public items = [
    { name: 'Item 1', id: '1' },
    { name: 'Item 2', id: '2' },
    { name: 'Item 3', id: '3' },
    { name: 'Item 4', id: '4' },
  ];
  
  private _message = inject(FsMessage);

  constructor() {
    setTimeout(() => {
      this.skeleton = true;
    }, 2000);
  }

  public searchAccounts = (query) => {
    const accounts: any[] = [
      { name: 'Bob', email: 'bob@gmail.com', id: 1 },
      { name: 'Ryan', email: 'ryan@gmail.com', id: 2 },
      { name: 'Jane', email: 'jane@gmail.com', id: 3 },
      { name: 'Dave', email: 'dave@gmail.com', id: 4 },
    ];

    accounts.forEach((item) => {
      item.avatar = `https://randomuser.me/api/portraits/men/${Math.floor((Math.random() * 99) + 1)}.jpg`;
    });

    return of(filter(accounts, (item) => {
      return item.email.toLowerCase().match(new RegExp(query.keyword.toLowerCase()));
    }));
  };

  public submit() {
    this.form.ngForm.ngSubmit.next(null);
  }

  public fetchChips = () => {
    return of(this.items);
  };

  public submitting() {
    this._message.info('Submitting validation');
  }

  public save = () => {
    return of(true)
      .pipe(
        delay(3000),
        tap(() => {
          this._message.success('Validation successful');
        }),
      );
  };

  public toggleDisable() {
    this.disabled = !this.disabled;

    if (this.disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public invalid() {
    console.log('Validation invalid');
  }

  public reset() {
    this.form.reset();
  }

  public clear() {
    this.form.clear();
  }

  public createSnapshot() {
    this.form.createSnapshot();
  }

  public dirty() {
    this.form.dirty();
  }
}
