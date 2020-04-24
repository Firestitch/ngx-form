import { Component, OnInit } from '@angular/core';
import { FsForm } from '@firestitch/form';


@Component({
  selector: 'broadcast-example',
  templateUrl: 'broadcast-example.component.html'
})
export class BroadcastExampleComponent implements OnInit {

  public status = 'Not Submitted';
  public name = null;
  public form = null;

  constructor(private fsForm: FsForm) {  }

  ngOnInit() {
    this.fsForm.on<string>('submit')
      .subscribe(() => {
        this.status = 'Submitting...';
      });

    this.fsForm.on<string>('valid')
      .subscribe(() => {
        this.status = 'Valid';
      });

    this.fsForm.on<string>('invalid')
      .subscribe(() => {
        this.status = 'Invalid';
      });
  }

  save() {}
}
