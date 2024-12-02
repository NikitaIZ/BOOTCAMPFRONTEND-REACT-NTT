import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRequest } from "../../../app/proxy/login-request";
import { useGlobalUserAppDispatch } from "../../../app/context/user";
import { UserAppActions } from "../../../app/domain/types/app-user";
import { mapperUserData } from "../../../app/mappers/UserData";
import iconUser from "../../../assets/user.svg";
import iconLock from "../../../assets/lock.svg";
import mailUser from "../../../assets/mail.svg";
import useValidation from "../../../app/hooks/useValidation";
import "./LoginCard.css";

const LoginCard: FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

    const { isValidEmail } = useValidation();
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
                password
            });

            setErrorMessage(null);

            const user = mapperUserData(response);

            console.log(user);

            dispatch({
                type: UserAppActions.UserLogin,
                payload: user,
            });

            navigate("/");
        } catch (err) {
            setErrorMessage("Invalid username or password. Please try again.");
        }
    };

    const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            setEmailError("Please fill out this field.");
            return;
        }

        if (!isValidEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        setEmailError(null);
        setIsEmailSent(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEmail("");
        setEmailError(null);
        setIsEmailSent(false); 
    };

    return (
        <div className="wrapper">
            <div className="title">
                <img src="public/imgs/logotipo.png" alt="Super Market" width="140" />
            </div>
            <form onSubmit={handleLogin}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="row">
                    <img src={iconUser} alt="user" />
                    <input
                        type="text"
                        placeholder="Username"
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
                <a href="#" className="pass" onClick={() => setShowModal(true)}>
                    Forgot password?
                </a>
                <div className="row button-form">
                    <input type="submit" value="Login" />
                </div>
            </form>

            {showModal && (
                <div className="modal">
                    <form className="modal-content" onSubmit={handleEmailSubmit}>
                        <h2>{isEmailSent ? "Email Sent!" : "Password Recovery"}</h2>
                        {!isEmailSent ? (
                            <>
                                <div className="row">
                                    <img src={mailUser} alt="mail" />
                                    <input
                                        type="text"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {emailError && <p className="error-message">{emailError}</p>}
                                <div className="row button-form">
                                    <input type="submit" value="Send" />
                                </div>
                                <div className="signup-link" onClick={handleCloseModal}>
                                    Cancel
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Your password recovery email has been sent successfully.</p>
                                <div className="row button-form">
                                    <button type="button" onClick={handleCloseModal}>
                                        OK
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginCard;

