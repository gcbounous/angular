import { Action } from "@ngrx/store";

import { User } from 'src/app/models/user.model';

export const LOGIN_START            = '[Auth] Login start';
export const SIGN_UP_START          = '[Auth] Sign up start';
export const AUTHENTICATE_SUCCESS   = '[Auth] Authenticate success';
export const AUTHENTICATE_FAIL      = '[Auth] Authenticate fail';
export const LOGOUT                 = '[Auth] Logout';
export const CLEAR_ERROR            = '[Auth] Clear error';
export const AUTO_LOGIN             = '[Auth] Auto login';

export type AuthActions =
AuthenticateSuccess
| AuthenticateFail
| LoginStart
| SignUpStart
| Logout
| ClearError
| AutoLogin;

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    payload: {user: User, redirect: boolean}
    
    constructor(user: User, redirect: boolean) {
        this.payload = {user: user, redirect: redirect};
    }
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string) { }
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    payload: { email: string, password: string };

    constructor(email: string, password: string) {
        this.payload = { email: email, password: password };
    }
}

export class SignUpStart implements Action {
    readonly type = SIGN_UP_START;
    payload: { email: string, password: string };

    constructor(email: string, password: string) {
        this.payload = { email: email, password: password };
    }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}