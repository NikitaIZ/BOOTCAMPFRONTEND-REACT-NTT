import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRequest } from "../../../app/proxy/login-request";
import { useGlobalUserAppDispatch } from "../../../app/context/user";
import { UserAppActions } from "../../../app/domain/types/app-user";
import iconUser from "../../../assets/user.svg";
import iconLock from "../../../assets/lock.svg";
import "./LoginCard.css";

const LoginCard: FC = () => {
    const [username, setUsername] = useState<string>("emilys");
    const [password, setPassword] = useState<string>("emilyspass");
    const [showModal, setShowModal] = useState<boolean>(false);

    const dispatch = useGlobalUserAppDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await authRequest.authUser({
                username,
                password,
                expiresInMins: 30,
            });

            dispatch({
                type: UserAppActions.UserLogin,
                payload: { isLoggedIn: true, username: response.username },
            });

            navigate("/");
        } catch (err) {
            setShowModal(true);
        }
    };

    return (
        <div className="wrapper">
            <div className="title"><span>Login Form</span></div>
            <form onSubmit={handleLogin}>
                <div className="row">
                    <img src={iconUser} alt="user" />
                    <input
                        type="text"
                        placeholder="Email or Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="row">
                    <img src={iconLock} alt="lock" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="row button-form">
                    <input type="submit" value="Login" />
                </div>
            </form>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Invalid username or password. Please try again.</p>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginCard;
