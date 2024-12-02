import { LoginAppReducer, LoginInitialState } from "../login";
import { LoginAppActions } from "@/app/domain/types/app-login";

describe("LoginAppReducer", () => {
    it("should handle LoginSetField action", () => {
        const action = {
            type: LoginAppActions.LoginSetField,
            payload: { field: "username", value: "testUser" },
        };

        const newState = LoginAppReducer(LoginInitialState, action);

        expect(newState.login.username).toBe("testUser");
    });

    it("should throw error if payload is invalid in LoginSetField", () => {
        const action = {
            type: LoginAppActions.LoginSetField,
            payload: { value: "Sin el Fill" },
        };
    
        expect(() => LoginAppReducer(LoginInitialState, action)).toThrowError(
            "Invalid payload for action: LOGIN_SET_FIELD"
        );
    });
    

    it("should handle LoginResetModal action", () => {
        const initialState = {
            login: {
                username: "testUser",
                password: "testPass",
                email: "test@example.com",
                showModal: true,
                emailError: "Invalid email",
                isEmailSent: true,
            },
        };

        const action = { type: LoginAppActions.LoginResetModal };
        const newState = LoginAppReducer(initialState, action);

        expect(newState.login.showModal).toBe(false);
        expect(newState.login.email).toBe("");
        expect(newState.login.emailError).toBeNull();
        expect(newState.login.isEmailSent).toBe(false);
    });

    it("should handle LoginResetForm action", () => {
        const initialState = {
            login: {
                username: "testUser",
                password: "testPass",
                email: "test@example.com",
            },
        };

        const action = { type: LoginAppActions.LoginResetForm };
        const newState = LoginAppReducer(initialState, action);

        expect(newState.login.username).toBe("");
        expect(newState.login.password).toBe("");
    });

    it("should throw error for unhandled action type", () => {
        const action = { type: "UNKNOWN_ACTION" };

        expect(() => LoginAppReducer(LoginInitialState, action as any)).toThrowError(
            "Unhandled action type: UNKNOWN_ACTION"
        );
    });
});
