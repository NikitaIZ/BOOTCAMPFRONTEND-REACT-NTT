import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRequest } from "../../../app/proxy/login-request";
import { useGlobalUserAppDispatch } from "../../../app/context/user";
import { UserAppActions } from "../../../app/domain/types/app-user";
import iconUser from "../../../assets/user.svg";
import iconLock from "../../../assets/lock.svg";
import mailUser from "../../../assets/mail.svg";
import useValidation from "../../../app/hooks/useValidation";
import Swal from "sweetalert2";
import "./LoginCard.css";

const LoginCard: FC = () => {
    const [username, setUsername] = useState<string>("emilys");
    const [password, setPassword] = useState<string>("emilyspass");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(""); 
    const [emailError, setEmailError] = useState<string | null>(null);
    const [emailSent, setEmailSent] = useState<boolean>(false); 
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
        setEmailSent(true);

        Swal.fire({
            title: "Success!",
            text: "A password recovery email has been sent.",
            icon: "success",
            confirmButtonText: "OK",
        }).then(() => {
            setEmail("");
            setShowModal(false);
            navigate("/login"); 
        });
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEmail("");
        setEmailError(null);
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

                <div className="pass" onClick={handleOpenModal}>
                    Forgot password?
                </div>

                <div className="row button-form">
                    <input type="submit" value="Login" />
                </div>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Password Recovery</h2>
                        <form onSubmit={handleEmailSubmit}>
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
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginCard;
