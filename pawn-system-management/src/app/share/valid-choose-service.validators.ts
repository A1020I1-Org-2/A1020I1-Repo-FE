import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function validChooseValidators(controlName:string):ValidatorFn{
  return (control:AbstractControl):ValidationErrors=>{
    if(control.get(controlName)?.value==0){
      return {'invalidChoose':true};
    }
    // @ts-ignore
    return null;
  }
}
