import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

import * as AuthActions from "./auth.actions";
import { environment } from "../../../environments/environment";
import { User } from "../../models/user.model";
import { Router } from '@angular/router';

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
    ) { }

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
                    map(respData => {
                        const tokenExpirationDate = new Date(new Date().getTime() + (+respData.expiresIn * 1000));
                        const user = new User(respData.email, respData.localId, respData.idToken, tokenExpirationDate);

                        return new AuthActions.Login(user);
                    }),
                    catchError(error => {
                        return of(new AuthActions.LoginFail(this.handleError(error))); // of() just creates a new empty observable (we can't send an error observable here)
                    }) 
                );
            }
        )
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap( () => this.router.navigate(['/recipes']) )
    );

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
        return errorMessage;
    }
}