import { AbstractControl, ValidatorFn } from "@angular/forms";

export function lettersValidator(control: AbstractControl): { [key: string]: any } {
    let letterRegEx =  /^[a-zA-Z\s]*$/;  
    let value = control.value;

    let result = letterRegEx.test(value);

    if (result) {
        return null;
    } else {
        return { "lettersValidator": { value } }
    }

}