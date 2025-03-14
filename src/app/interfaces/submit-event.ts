import { NgForm } from '@angular/forms';


export interface SubmitEvent {
  ngForm?: NgForm;
  submitter?: string;  
  confirmed?: boolean,
}
