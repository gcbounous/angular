import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    genders = ['male', 'female'];
    forbiddenUsernames = ['Chris', 'Anna'];

    signupForm: FormGroup;

    ngOnInit() {
        this.signupForm = new FormGroup({
            'userData' : new FormGroup ({
                'username': new FormControl(null, [Validators.required, this.forbiddenNamesValidator.bind(this)]),
                'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsValidator),
            }),
            'gender': new FormControl('male'),
            'hobbies': new FormArray([]) 
        });

        // this.signupForm.valueChanges.subscribe(
        //     (value) => console.log(value)
        // );

        this.signupForm.statusChanges.subscribe(
            (status) => console.log(status)
        );

        this.signupForm.setValue({
            'userData': {
                'username': 'Max',
                'email': 'max@test.com'
            },
            'gender': 'female',
            'hobbies': []
        });

        this.signupForm.patchValue({
            'userData': {
                'username': 'Maris',
            }
        });
    }

    onSubmit() {
        console.log(this.signupForm);

        // Resets all fields to empty, we can reset to specific values by passing an object as argument
        // this.signupForm.reset({'gender':'male'});
    }

    onAddHobby() {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.signupForm.get('hobbies')).push(control);
    }

    // if there is an error on the validator we should return the error, if not we should return null
    forbiddenNamesValidator(control: FormControl) : {[s: string] : boolean} {
        if (this.forbiddenUsernames.indexOf(control.value) != -1) {
            return { 'nameIsForbidden': true };
        }
        return null;
    }

    forbiddenEmailsValidator(control: FormControl): Promise<any> | Observable<any> {
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

    get controls() {
        return (this.signupForm.get('hobbies') as FormArray).controls;
    }
}
