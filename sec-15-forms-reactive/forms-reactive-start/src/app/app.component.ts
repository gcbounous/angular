import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { UserDataValidators } from 'src/validators/userData.validators.';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    genders = ['male', 'female'];

    signupForm: FormGroup;

    ngOnInit() {
        this.signupForm = new FormGroup({
            'userData' : new FormGroup ({
                'username': new FormControl(null, [Validators.required, UserDataValidators.forbiddenNamesValidator.bind(UserDataValidators)]),
                'email': new FormControl(null, [Validators.required, Validators.email], UserDataValidators.forbiddenEmailsValidator),
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

    get controls() {
        return (this.signupForm.get('hobbies') as FormArray).controls;
    }
}
