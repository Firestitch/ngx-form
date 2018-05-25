import { NgModule, Component } from '@angular/core';
import { FsForm } from './../../../../src';

@Component({
  selector: 'first-example',
  templateUrl: 'first-example.component.html',
  styleUrls: [ 'first-example.component.css' ]
})
export class FirstExampleComponent {

  public required = true;
  public hidden = false;
  public render = true;
  public status = 'Not Submitted';
  public lengthInput = '';
  public datepicker = null;
  public checkbox: object[] = [];
  
  public items = [
    { name: 'Item 1', id: 1 },
    { name: 'Item 2', id: 2 },
    { name: 'Item 3', id: 3 },
    { name: 'Item 4', id: 4 }
  ]; 
  
  constructor(private fsForm: FsForm) {}

  submitting() {
    this.status = 'Submitting...';
  }

  save() {
    this.status = 'Valid';
    console.log('Called Save');
  }

  invalid(form) {
    this.status = 'Invalid';
  }
}
