import { Component, OnInit } from '@angular/core';
import { EmailService, EmailSumary } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {

  emails: EmailSumary[];

  constructor(
    private emailServive: EmailService
  ) { }

  ngOnInit(): void {
    this.emailServive.getEmails().subscribe((emails) => {
      this.emails = emails;
    })
  }

}
