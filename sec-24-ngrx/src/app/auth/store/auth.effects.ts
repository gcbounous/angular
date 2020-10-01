import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

import * as AuthActions from "./auth.actions";
import { environment } from "../../../environments/environment";
import { User } from "../../models/user.model";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
    ) { }

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(AuthActions.SIGN_UP_START),
        switchMap(
            (authData: AuthActions.LoginStart) => {
                return this.http.post<AuthResponseData>(
                    environment.API_URL + 'signUp',
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    },
                    { params: { 'key': environment.firebaseAPIKey } }
                ).pipe(
                    map(respData => this.handleAthentication(respData) ),
                    catchError( error => this.handleError(error) ) 
                );
            }
        )
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap(
            (authData: AuthActions.LoginStart) => {
                return this.http.post<AuthResponseData>(
                    environment.API_URL + 'signInWithPassword',
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    },
                    { params: { 'key': environment.firebaseAPIKey } }
                ).pipe(
                    map( respData => this.handleAthentication(respData) ),
                    catchError( error => this.handleError(error) ) 
                );
            }
        )
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {            
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('user'));
            
            if(!userData) {
                return { type: 'DUMMY' };
            }

            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if (loadedUser.token) {
                const expirationTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationTime);
                return new AuthActions.AuthenticateSuccess(loadedUser);
            }

            return { type: 'DUMMY'};
        
        })
    );

    @Effect({ dispatch: false })
    authSuccessRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap( () => this.router.navigate(['/']) )
    );

    @Effect({ dispatch: false })
    authLogoutRedirect = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('user');
            this.router.navigate(['/auth']);
        })
    );

    private handleAthentication(authData: AuthResponseData) {
        const tokenExpirationDate = new Date(new Date().getTime() + (+authData.expiresIn * 1000));
        const user = new User(authData.email, authData.localId, authData.idToken, tokenExpirationDate);

        localStorage.setItem('user', JSON.stringify(user));
        this.authService.setLogoutTimer(+authData.expiresIn * 1000);
        return new AuthActions.AuthenticateSuccess(user);
    }

    private handleError(errorResp: HttpErrorResponse) {
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

        return of(new AuthActions.AuthenticateFail(errorMessage)); // of() just creates a new empty observable (we can't throw an error here)
    }
}