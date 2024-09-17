import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'emit-example',
  templateUrl: './emit-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmitExampleComponent {
  
  @ViewChild('form') public form;

  public status = 'Not Submitted';
  public minMaxInput = null;
  public required = null;

  public submitting() {
    this.status = 'Submitting...';
  }

  public save() {
    this.status = 'Valid';
  }

  public invalid() {
    this.status = 'Invalid';
  }

  public emitSubmit() {
    this.form.ngSubmit.emit();
  }

}
