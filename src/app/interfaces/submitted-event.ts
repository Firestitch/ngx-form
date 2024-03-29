import { NgForm } from '@angular/forms';


export interface SubmittedEvent {
  ngForm: NgForm,
  submitter: string,
  response: any,
  confirmed?: boolean,
}
