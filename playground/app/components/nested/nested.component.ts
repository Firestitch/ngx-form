import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';

@Component({
  selector: 'nested',
  templateUrl: 'nested.component.html',
  styleUrls: ['nested.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedComponent {

  public firstname;
  public email;
  public show = false;

  constructor(
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
  ) {
  }

  public save() {
    this._message.success('Successfully submitted');
  }
}

