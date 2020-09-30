import { Action } from "@ngrx/store";
import { User } from 'src/app/models/user.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export type AuthActions = Login | Logout;

export class Login implements Action {
    readonly type = LOGIN;
    
    constructor(public payload: User) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}