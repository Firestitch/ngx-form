import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';

import { Subject } from 'rxjs';


export interface ConfirmTabGroup extends MatTabGroup {
  _originalHandleClick(tab: MatTab, tabHeader: MatTabHeader, index: number): void;
  _handlClick$: Subject<{ tab: MatTab; tabHeader: MatTabHeader; idx: number }>;
}
