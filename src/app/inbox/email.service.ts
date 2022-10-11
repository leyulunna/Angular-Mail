import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';

export interface EmailSumary {
  id: string,
  subject: string,
  from: string
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  apiUrl = 'https://api.angular-email.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  getEmails(){
    return this.httpClient.get<EmailSumary[]>(`${this.apiUrl}/emails`);
  }

  getEmail(id: string){
    return this.httpClient.get<Email>(`${this.apiUrl}/emails/${id}`);
  }

  sendEmail(email: EmailSumary){
    return this.httpClient.post(`${this.apiUrl}/emails`, email)
  }
}
