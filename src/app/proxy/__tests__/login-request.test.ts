import { authRequest } from "../login-request";
import { LoginRequest, LoginResponse } from "@/app/domain/interfaces/login";

global.fetch = jest.fn();

describe("authRequest", () => {
    const mockCredentials: LoginRequest = { username: "emilys", password: "emilyspass" };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully authenticate a user and return a response", async () => {
        const mockResponse: LoginResponse = {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3MzMxMjc2MDMsImV4cCI6MTczMzEyOTQwM30.4PhipcJomQsrVm4127dNgGYOZ-Ym9SXQ2LetgEM4wnk",
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3MzMxMjc2MDMsImV4cCI6MTczNTcxOTYwM30.3s5iZ5NhFOUoNxqiinHBMg3-5VbPw7Tyd2L-fOLunCo",
            id: 1,
            username: "emilys",
            email: "emily.johnson@x.dummyjson.com",
            firstName: "Emily",
            lastName: "Johnson",
            gender: "female",
            image: "https://dummyjson.com/icon/emilys/128"
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await authRequest.authUser(mockCredentials);

        expect(fetch).toHaveBeenCalledWith(
            "https://dummyjson.com/auth/login",
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mockCredentials),
            })
        );

        expect(result).toEqual(mockResponse);
    });

    it("should throw an error if the response is not ok", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: jest.fn().mockResolvedValueOnce({ message: "Invalid credentials" }),
        });

        await expect(authRequest.authUser(mockCredentials)).rejects.toThrow(
            "Login failed. Please check your credentials."
        );
    });

    it("should throw a 'Network error during login.' message for unknown errors", async () => {
        const unknownError = { message: "Some unknown issue" };
    
        (global.fetch as jest.Mock).mockRejectedValueOnce(unknownError);
    
        await expect(authRequest.authUser(mockCredentials)).rejects.toThrow(
            "Network error during login."
        );
    });
});
