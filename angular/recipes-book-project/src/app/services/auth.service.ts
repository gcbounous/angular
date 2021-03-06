import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // with this type of subject we can have access to the user even if the event has beeen emitted some time ago.
    user = new BehaviorSubject<User>(null);

    private API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string): any {
        return this.http
            .post<AuthResponseData>(
                this.API_URL + 'signUp',
                {
                    email,
                    password,
                    returnSecureToken: true,
                },
                { params: { key: environment.firebaseAPIKey } }
            )
            .pipe(
                catchError(this.handleError),
                tap((respData) => console.log(respData))
            );
    }

    login(email: string, password: string): any {
        return this.http
            .post<AuthResponseData>(
                this.API_URL + 'signInWithPassword',
                {
                    email,
                    password,
                    returnSecureToken: true,
                },
                { params: { key: environment.firebaseAPIKey } }
            )
            .pipe(
                catchError(this.handleError),
                tap((respData) => this.hendlesAuthentication(respData))
            );
    }

    autoLogin(): void {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            const expirationTime =
                new Date(userData._tokenExpirationDate).getTime() -
                new Date().getTime();
            this.setUser(loadedUser, expirationTime);
        }
    }

    logout(): void {
        this.user.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/auth']);

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogOut(expirationTime: number): void {
        // expirationTime in milliseconds
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
            alert('Your session is over. Logging out...');
        }, expirationTime);
    }

    private hendlesAuthentication(authData: AuthResponseData): void {
        const tokenExpirationDate = new Date(
            new Date().getTime() + +authData.expiresIn * 1000
        );
        const user = new User(
            authData.email,
            authData.localId,
            authData.idToken,
            tokenExpirationDate
        );

        this.setUser(user, +authData.expiresIn * 1000);
        localStorage.setItem('user', JSON.stringify(user));
    }

    private setUser(user: User, expirationTimeInMilli: number): void {
        this.user.next(user);
        this.autoLogOut(expirationTimeInMilli);
    }

    private handleError(errorResp: HttpErrorResponse): any {
        console.log(errorResp);
        let errorMessage = 'An unknown error occured.';

        if (errorResp.error && errorResp.error.error) {
            switch (errorResp.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This e-mail already exists!';
                    break;
                case 'INVALID_EMAIL':
                    errorMessage =
                        'This e-mail in invalid! Please enter a valid email.';
                    break;
                case 'EMAIL_NOT_FOUND':
                case 'INVALID_PASSWORD':
                    errorMessage =
                        'You have typed a wrong e-mail or password. Please try again.';
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'This user has been disabled.';
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
