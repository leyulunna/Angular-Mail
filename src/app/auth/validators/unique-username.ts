import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator } from "@angular/forms";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable({ providedIn: "root" })
export class UniqueUsername implements AsyncValidator{

  constructor(
    private authServive: AuthService
  ){}

  validate = (control: AbstractControl) => {
    const { value } = control;

    return this.authServive.registerUsername(value).pipe(
      map(() => {
        return null
      }),
      catchError(err => {
        if(err.error.username){
          return of({ nonUniqueName: true })
        }
        else{
          return of({ noConnection: true })
        }
      })
    );
  }

}
