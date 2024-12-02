import { LoginState } from "../domain/interfaces/login";
import { LoginAppActions } from "../domain/types/app-login";

export interface LoginDispatchObject<A, T = unknown> {
    type: A;
    payload?: T;
}

export interface LoginAppState {
    login: LoginState;
}

export const LoginInitialState: LoginAppState = {
    login: {
        username: "",
        password: "",
        email: "",
    },
};

export const LoginAppReducer = (
    state: LoginAppState,
    { type, payload }: LoginDispatchObject<LoginAppActions>
): LoginAppState => {
    switch (type) {
        case LoginAppActions.LoginSetField:
            if (
                payload &&
                typeof payload === "object" &&
                "field" in payload &&
                "value" in payload
            ) {
                const { field, value } = payload as { field: keyof LoginState; value: unknown };
                return {
                    ...state,
                    login: {
                        ...state.login,
                        [field]: value,
                    },
                };
            }
            throw new Error(`Invalid payload for action: ${type}`);
        case LoginAppActions.LoginResetModal:
            return {
                ...state,
                login: {
                    ...state.login,
                    showModal: false,
                    email: "",
                    emailError: null,
                    isEmailSent: false,
                },
            };
        case LoginAppActions.LoginResetForm:
            return {
                ...state,
                login: {
                    ...state.login,
                    username: "",
                    password: ""
                },
            };
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};
