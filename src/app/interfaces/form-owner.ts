import { Observable } from 'rxjs';

import type { FsFormDirective } from '../directives/form/form.directive';

import { ConfirmConfig } from './confirm-config';
import { SubmitEvent } from './submit-event';
import { SubmittedEvent } from './submitted-event';


/**
 * What the unsaved-changes confirm and the route guard need from whatever owns a
 * set of forms. Both an `fsForm` at the root of its linked set and an
 * `fsFormContainer` holding several satisfy it, so neither caller has to know
 * which of the two it was handed.
 */
export interface FsFormOwner {
  confirm: ConfirmConfig | boolean;
  linkedForms: FsFormDirective[];
  reset(): void;
  submit$(event?: SubmitEvent): Observable<SubmittedEvent>;
}
