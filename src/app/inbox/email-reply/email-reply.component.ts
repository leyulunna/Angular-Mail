import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnInit {
  @Input() email: Email;

  showModal = false;
  //email: Email;

  constructor() { }

  ngOnInit(): void {

    const text = this.email.text.replace(/\n/gi, '\n> ');

    this.email = {
      ...this.email,
      to: this.email.from,
      from: this.email.to,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n------- ${this.email.from} wrote:\n>${text}`
    };
  }

  onSubmit(emailValue: Email) {

  }

}
