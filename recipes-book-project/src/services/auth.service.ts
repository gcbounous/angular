import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from "src/models/user.model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
    // with this type of subject we can have access to the user even if the event has beeen emitted some time ago.
    user = new BehaviorSubject<User>(null);

    private API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    private API_KEY = 'AIzaSyAKlOzRd2KRpN-jNcrGJuWqHqJiLfj33oU';

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.API_URL + 'signUp',
            {
                email : email,
                password : password,
                returnSecureToken : true
            },
            { params: {'key': this.API_KEY } }
        ).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.API_URL + 'signInWithPassword',
            {
                email: email,
                password: password,
                returnSecureToken: true
            },
            { params: { 'key': this.API_KEY } }
        ).pipe(
            catchError(this.handleError), 
            tap(respData => this.hendlesAuthentication(respData))
        );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private hendlesAuthentication(authData: AuthResponseData) {
        const tokenExpirationDate = new Date(new Date().getTime() + (+authData.expiresIn * 1000));
        const user = new User(authData.email, authData.localId, authData.idToken, tokenExpirationDate);
        this.user.next(user);
    }

    private handleError(errorResp: HttpErrorResponse) {
        console.log(errorResp);
        let errorMessage = 'An unknown error occured.';

        if (errorResp.error && errorResp.error.error) {
            switch (errorResp.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This e-mail already exists!'
                    break;
                case 'INVALID_EMAIL':
                    errorMessage = 'This e-mail in invalid! Please enter a valid email.'
                    break;
                case 'EMAIL_NOT_FOUND':
                case 'INVALID_PASSWORD':
                    errorMessage = 'You have typed a wrong e-mail or password. Please try again.'
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'This user has been disabled.'
                    break;
            }
        }

        return throwError(errorMessage);
    }

}


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
