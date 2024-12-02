import { LoginResponse } from "../domain/interfaces/login";
import { User } from "../domain/interfaces/user"; 

export const mapperUserData = (response: LoginResponse): User => {
    return {
        isLoggedIn: true,
        username: response.username,
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        image: response.image,
    };
};