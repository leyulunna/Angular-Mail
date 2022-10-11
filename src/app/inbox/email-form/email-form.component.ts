import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  @Input() email: Email;
  @Output() submitEmail = new EventEmitter();

  emailForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    const {subject, text, to, from} = this.email;
    this.emailForm = new FormGroup({
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({value: from, disabled: true})
    })
  }

  onSubmit() {
    if(this.emailForm.invalid) {
      return;
    }
    this.submitEmail.emit(this.emailForm.value);
  }

}
