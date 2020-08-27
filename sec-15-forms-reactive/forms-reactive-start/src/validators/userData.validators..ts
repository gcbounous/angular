import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";

export class UserDataValidators {
    static forbiddenUsernames = ['Chris', 'Anna'];

    // if there is an error on the validator we should return the error, if not we should return null
    static forbiddenNamesValidator(control: FormControl) : {[s: string] : boolean} {
        if (this.forbiddenUsernames.indexOf(control.value) != -1) {
            return { 'nameIsForbidden': true };
        }
        return null;
    }

    static forbiddenEmailsValidator(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (control.value == 'test@test.com') {
                    resolve({ 'emailIsForbidden': true });
                } else {
                    resolve(null);
                }
            }, 1500);
        });
        return promise;
    }
}