export interface LoginResponse {
    token: string;
    username: string;
    expiresIn: number;
    [key: string]: any;
}

export interface LoginRequest {
    username: string;
    password: string;
    expiresInMins?: number;
}