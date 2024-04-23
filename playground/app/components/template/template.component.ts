import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateComponent {

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

