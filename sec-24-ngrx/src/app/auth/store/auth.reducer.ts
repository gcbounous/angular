import { User } from "../../models/user.model";
import * as AuthActions from "./auth.actions";

export interface State {
    user: User;
    authError: string;
    loading: boolean;
};

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {

    switch (action.type) {
        case AuthActions.LOGIN:
            return {
                ...state,
                user: action.payload,
                authError: null,
                loading: false,
            }

        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }

        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                authError: action.payload,
                loading: false,
            }

        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                authError: null,
                loading: false,
            };

        default:
            return state;
    }
};
