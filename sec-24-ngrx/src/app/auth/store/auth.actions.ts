import { Action } from "@ngrx/store";
import { User } from 'src/app/models/user.model';

export const LOGIN_START            = '[Auth] Login start';
export const SIGN_UP_START          = '[Auth] Sign up start';
export const AUTHENTICATE_SUCCESS   = '[Auth] Authenticate success';
export const AUTHENTICATE_FAIL      = '[Auth] Authenticate fail';
export const LOGOUT                 = '[Auth] Logout';
export const CLEAR_ERROR            = '[Auth] Clear error';

export type AuthActions =
AuthenticateSuccess
| AuthenticateFail
| LoginStart
| SignUpStart
| Logout
| ClearError;

interface AuthAction {
    readonly type: string;
    payload?: any;
}


export class AuthenticateSuccess implements Action, AuthAction {
    readonly type = AUTHENTICATE_SUCCESS;
    
    constructor(public payload: User) {}
}

export class AuthenticateFail implements Action, AuthAction {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string) { }
}

export class LoginStart implements Action, AuthAction {
    readonly type = LOGIN_START;
    payload: { email: string, password: string };

    constructor(email: string, password: string) {
        this.payload = { email: email, password: password };
    }
}

export class SignUpStart implements Action, AuthAction {
    readonly type = SIGN_UP_START;
    payload: { email: string, password: string };

    constructor(email: string, password: string) {
        this.payload = { email: email, password: password };
    }
}

export class Logout implements Action, AuthAction {
    readonly type = LOGOUT;
}

export class ClearError implements Action, AuthAction {
    readonly type = CLEAR_ERROR;
}