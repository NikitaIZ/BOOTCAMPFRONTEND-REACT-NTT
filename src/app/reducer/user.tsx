import { User } from "../domain/interfaces/user";
import { UserAppActions } from "../domain/types/app-user";

export interface UserDispatchObject<A, T = unknown> {
    type: A;
    payload?: T;
}

export interface UserAppState {
    user: User;
}

export const userInitialState: UserAppState = {
    user: {
        isLoggedIn: false,
        username: undefined,     
        id: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        gender: undefined,
        image: undefined,
    },
};

export const userAppReducer = (
    state: UserAppState,
    { type, payload }: UserDispatchObject<UserAppActions>
): UserAppState => {
    switch (type) {
        case UserAppActions.UserLogin:
            return {
                ...state,
                user: {
                    isLoggedIn: true,
                    username: (payload as User).username,
                    id: (payload as User).id,
                    email: (payload as User).email,
                    firstName: (payload as User).firstName,
                    lastName: (payload as User).lastName,
                    gender: (payload as User).gender,
                    image: (payload as User).image,
                },
            };
        case UserAppActions.Userlogout:
            return {
                ...state,
                user: {
                    isLoggedIn: false,
                    username: undefined,
                    id: undefined,
                    email: undefined,
                    firstName: undefined,
                    lastName: undefined,
                    gender: undefined,
                    image: undefined,
                },
            };
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};
