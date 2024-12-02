import { Dispatch } from "react";
import { LoginDispatchObject } from "@/app/reducer/login"; 

export type LoginAppDispatch = Dispatch<LoginDispatchObject<LoginAppActions>>;

export const enum LoginAppActions {
    LoginSetField = "LOGIN_SET_FIELD",
    LoginResetModal = "LOGIN_RESET_MODAL",
    LoginResetForm = "LOGIN_RESET_FORM"
}