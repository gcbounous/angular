import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('f', {static:true}) subscriptionForm: NgForm;

    defaultSubscription = 'advanced';
    submitted = false;
    subscription = {
        email: '',
        subscription: '',
        password: ''
    };

    onSubmit() {
        console.log(this.subscriptionForm);
        this.submitted = true;
        this.subscription.email = this.subscriptionForm.form.value.email;
        this.subscription.subscription = this.subscriptionForm.form.value.subscription;
        this.subscription.password = this.subscriptionForm.form.value.password;
    }

}
