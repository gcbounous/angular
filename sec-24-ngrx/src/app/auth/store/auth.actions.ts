import { Action } from "@ngrx/store";
import { User } from 'src/app/models/user.model';

export const LOGIN          = '[Auth] Login';
export const LOGIN_START    = '[Auth] Login start';
export const LOGIN_FAIL     = '[Auth] Login fail';
export const LOGOUT         = '[Auth] Logout';

export type AuthActions =
Login
| LoginStart
| LoginFail
| Logout;

export class Login implements Action {
    readonly type = LOGIN;
    
    constructor(public payload: User) {}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    payload: { email: string, password: string };

    constructor(email: string, password: string) {
        this.payload = { email: email, password: password} ;
    }
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}