import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    projectForm: FormGroup;

    ngOnInit() {
        this.projectForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, this.forbiddenNameValidator]),
            'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailValidator),
            'status': new FormControl('critical')
        });
    }

    forbiddenNameValidator(control: FormControl): {[errorCode: string]: boolean} {
        if (typeof control.value == 'string' && control.value.toUpperCase() == 'TEST'){
            return {'nameIsForbidden' : true };
        }
        return null;
    }

    forbiddenEmailValidator(control: FormControl): Promise<any> | Observable<any> {
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

    onSubmit() {
        console.log(this.projectForm);
    }
}
