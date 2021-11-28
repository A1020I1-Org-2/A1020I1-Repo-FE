import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function validDateCheckoutValidators(startDate: string, endDate: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    let checkout = new Date(control.get(endDate)?.value).getTime();
    let checkin = new Date(control.get(startDate)?.value).getTime();
    if(checkout < checkin){
      return {'invalidCheckout':true};
    }
    // @ts-ignore
    return null;
  }
}
