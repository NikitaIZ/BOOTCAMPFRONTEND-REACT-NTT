import { Dispatch } from "react";
import { UserDispatchObject } from "@/app/reducer/user";

export type UserAppDispatch = Dispatch<UserDispatchObject<UserAppActions>>;

export const enum UserAppActions {
    UserLogin = "USER_LOGIN",
    Userlogout = "USER_LOGOUT"
}