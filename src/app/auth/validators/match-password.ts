import { Injectable } from "@angular/core";
import { AbstractControl, Validators } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class MatchPassword implements Validators{
  validate(control: AbstractControl){
    const { password, passwordConfirmation } = control.value;
    if( password === passwordConfirmation){
      return null
    }
    return { passwordDonMatch: true };
  }
}
