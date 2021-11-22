export class ValidateCustomer {
    isValid: boolean;
    constructor(isValid: boolean) {
        this.isValid = isValid;
    }
    checkRequired(value: string): boolean {
        return value !== '';
    }

    // checkPattern(value: string): boolean {
    //     return
    // }

}