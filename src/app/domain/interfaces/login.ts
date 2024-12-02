export interface LoginResponse {
    accessToken: string
    refreshToken: string
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    expiresIn: number;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginState {
    username: string;
    password: string;
    email: string;
    errorMessage?: string | null;
    showModal?: boolean;
    emailError?: string | null;
    isEmailSent?: boolean;
}