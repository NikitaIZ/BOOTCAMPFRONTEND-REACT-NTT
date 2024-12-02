import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authRequest } from "../../../app/proxy/login-request";
import { useGlobalUserAppDispatch } from "../../../app/context/user";
import { UserAppActions } from "../../../app/domain/types/app-user";
import { ModuleRoutes } from "../../../app/routes/routes";
import iconUser from "../../../assets/user.svg";
import iconLock from "../../../assets/lock.svg";
import "./LoginCard.css";

const LoginCard: FC = () => {
    const [username, setUsername] = useState<string>("emilys");
    const [password, setPassword] = useState<string>("emilyspass");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useGlobalUserAppDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        try {
            const response = await authRequest.authUser({
                username,
                password,
                expiresInMins: 30,
            });

            setErrorMessage(null);

            dispatch({
                type: UserAppActions.UserLogin,
                payload: { isLoggedIn: true, username: response.username },
            });

            navigate("/");
        } catch (err) {
            setErrorMessage("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="wrapper">
            <div className="title"><span>Login Form</span></div>
            <form onSubmit={handleLogin}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="row">
                    <img src={iconUser} alt="user" />
                    <input
                        type="text"
                        placeholder="Email or Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="row">
                    <img src={iconLock} alt="lock" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="pass">
                    <Link to={ModuleRoutes.Recovery}>
                        Forgot password?
                    </Link>
                </div>
                <div className="row button-form">
                    <input type="submit" value="Login" />
                </div>
                <div className="signup-link"></div>
            </form>
        </div>
    );
};

export default LoginCard;
