import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
    private tokenExpirationTimer: any;

    constructor(private store: Store<fromApp.AppState>) { }

    setLogoutTimer(expirationTime: number) {
        // expirationTime in milliseconds
        this.tokenExpirationTimer = setTimeout(() => {
            alert('Your session is over. Logging out...')
            this.store.dispatch(new AuthActions.Logout());
        }, expirationTime);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

}

