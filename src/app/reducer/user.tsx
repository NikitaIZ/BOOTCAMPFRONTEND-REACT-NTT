import { User } from "../domain/interfaces/user";
import { UserAppActions } from "../domain/types/app-user";

export interface UserDispatchObject<A, T = unknown> {
    type: A;
    payload?: T;
}

export interface UserAppState {
    user: User[];
}

export const userInitialState: UserAppState = {
    user: [],
};

export const userAppReducer = (
    state: UserAppState,
    { type, payload }: UserDispatchObject<UserAppActions>
) => {
    switch (type) {
        case UserAppActions.UserLogin:
            return {
                ...state,
                user: [...state.user, payload as User],
            };
        case UserAppActions.Userlogout:
            return {
                ...state,
                user: payload as User[],
            };
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};
