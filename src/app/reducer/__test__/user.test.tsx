import { userAppReducer, userInitialState } from "../user";
import { UserAppActions } from "@/app/domain/types/app-user";
import { User } from "@/app/domain/interfaces/user"; 

describe("userAppReducer", () => {
    it("should handle UserLogin action and update the state correctly", () => {
        const userPayload: User = {
            isLoggedIn: true,
            username: "emilys",
            id: 1,
            email: "emily.johnson@dummy.com",
            firstName: "Emily",
            lastName: "Johnson",
            gender: "female",
            image: "https://dummyjson.com/user-image.jpg",
        };

        const action = {
            type: UserAppActions.UserLogin,
            payload: userPayload,
        };

        const newState = userAppReducer(userInitialState, action);

        expect(newState.user.isLoggedIn).toBe(true);
        expect(newState.user.username).toBe("emilys");
        expect(newState.user.id).toBe(1);
        expect(newState.user.email).toBe("emily.johnson@dummy.com");
        expect(newState.user.firstName).toBe("Emily");
        expect(newState.user.lastName).toBe("Johnson");
        expect(newState.user.gender).toBe("female");
        expect(newState.user.image).toBe("https://dummyjson.com/user-image.jpg");
    });

    it("should handle UserLogout action and reset the state correctly", () => {
        const loggedInState = {
            user: {
                isLoggedIn: true,
                username: "emilys",
                id: 1,
                email: "emily.johnson@dummy.com",
                firstName: "Emily",
                lastName: "Johnson",
                gender: "female",
                image: "https://dummyjson.com/user-image.jpg",
            },
        };

        const action = {
            type: UserAppActions.Userlogout,
        };

        const newState = userAppReducer(loggedInState, action);

        expect(newState.user.isLoggedIn).toBe(false);
        expect(newState.user.username).toBeUndefined();
        expect(newState.user.id).toBeUndefined();
        expect(newState.user.email).toBeUndefined();
        expect(newState.user.firstName).toBeUndefined();
        expect(newState.user.lastName).toBeUndefined();
        expect(newState.user.gender).toBeUndefined();
        expect(newState.user.image).toBeUndefined();
    });

    it("should throw an error if an unhandled action type is passed", () => {
        const action = {
            type: "UNKNOWN_ACTION",
        };

        expect(() => userAppReducer(userInitialState, action as any)).toThrowError(
            "Unhandled action type: UNKNOWN_ACTION"
        );
    });
});
