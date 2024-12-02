import { LoginRequest, LoginResponse } from "../domain/interfaces/login";

const authApiUrl = "https://dummyjson.com/auth/login";

const authUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await fetch(authApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        
        if (!response.ok) {
            throw new Error("Login failed. Please check your credentials.");
        }

        const data: LoginResponse = await response.json();
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Network error during login.");
    }
};

export const authRequest = {
    authUser,
};
