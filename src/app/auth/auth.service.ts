import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AvailableUsername {
  available: boolean
}

interface SignupCredential {
  username: string,
  password: string,
  passwordConfirmation: string,
}

interface SignupResponse {
  username: string,
}

interface checkAuthResponse {
  authenticated: boolean,
  username: string
}

interface SigninCredential {
  username: string,
  password: string
}

interface SigninResponse {
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);
  username = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  registerUsername(name: string){
    return this.httpClient.post<AvailableUsername>(`${this.api}/auth/username`, { username: name })
  }

  signup(credential: SignupCredential){
    return this.httpClient.post<SignupResponse>(
      `${this.api}/auth/signup`,
      credential
      )
    .pipe(
      tap(() => this.signedin$.next(true))
    )
  }

  checkAuth(){
    return this.httpClient.get<checkAuthResponse>(
      `${this.api}/auth/signedin`
      )
    .pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    )
  }

  signout(){
    return this.httpClient.post(`${this.api}/auth/signout`, {})
      .pipe(
        tap(() => {
          this.signedin$.next(false)
        })
      )
  }

  signin(credential: SigninCredential){
    return this.httpClient.post<SigninResponse>(`${this.api}/auth/signin`, credential)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      )
  }
}
