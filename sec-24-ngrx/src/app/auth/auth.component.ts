import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService, AuthResponseData } from 'src/app/services/auth.service'
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    isLoginMode = true;
    isLoading = false;
    error = null;

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit(): void {
        this.store.select('auth').subscribe(
            authState => {
                this.isLoading = authState.loading;
                this.error = authState.authError;
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authFuncObservable = new Observable<AuthResponseData>();

        if (this.isLoginMode) {
            // authFuncObservable = this.authService.login(email, password);
            this.store.dispatch(new AuthActions.LoginStart(email, password));
        } else {
            authFuncObservable = this.authService.signup(email, password);
        }
        
        this.isLoading = true;

        // authFuncObservable.subscribe(
        //     responseData => {
        //         console.log(responseData);
        //         this.router.navigate(['/recipes']);
        //         this.isLoading = false;
        //     },
        //     errorMessage => {
        //         this.error = errorMessage;
        //         this.isLoading = false;
        //     }
        // );

        form.resetForm();
    }

    onCloseErrorAlert() {
        this.error = null;
    }
}
