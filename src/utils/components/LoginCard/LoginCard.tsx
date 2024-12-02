import { FC, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { authRequest } from "../../../app/proxy/login-request";
import { useGlobalUserAppDispatch } from "../../../app/context/user";
import { UserAppActions } from "../../../app/domain/types/app-user";
import { LoginAppReducer, LoginInitialState } from "../../../app/reducer/login";
import { LoginAppActions } from "../../../app/domain/types/app-login";
import { mapperUserData } from "../../../app/mappers/UserData";
import iconUser from "../../../assets/user.svg";
import iconLock from "../../../assets/lock.svg";
import mailUser from "../../../assets/mail.svg";
import useValidation from "../../../app/hooks/useValidation";
import "./LoginCard.css";

const LoginCard: FC = () => {
    const [state, dispatch] = useReducer(LoginAppReducer, LoginInitialState);
    const { username, password, email, errorMessage, showModal, emailError, isEmailSent } = state.login;

    const { isValidEmail } = useValidation();
    const globalDispatch = useGlobalUserAppDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            dispatch({
                type: LoginAppActions.LoginSetField,
                payload: { field: "errorMessage", value: "Please fill out all fields." },
            });
            return;
        }

        try {
            const response = await authRequest.authUser({ username, password });

            const user = mapperUserData(response);

            globalDispatch({
                type: UserAppActions.UserLogin,
                payload: user,
            });

            navigate("/");
        } catch {
            dispatch({
                type: LoginAppActions.LoginSetField,
                payload: { field: "errorMessage", value: "Invalid username or password. Please try again." },
            });

            dispatch({ type: LoginAppActions.LoginResetForm });
        }
    };

    const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            dispatch({
                type: LoginAppActions.LoginSetField,
                payload: { field: "emailError", value: "Please fill out this field." },
            });
            return;
        }

        if (!isValidEmail(email)) {
            dispatch({
                type: LoginAppActions.LoginSetField,
                payload: { field: "emailError", value: "Please enter a valid email address." },
            });
            return;
        }

        dispatch({
            type: LoginAppActions.LoginSetField,
            payload: { field: "isEmailSent", value: true },
        });
    };

    const handleCloseModal = () => {
        dispatch({ type: LoginAppActions.LoginResetModal });
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
                        onChange={(e) =>
                            dispatch({
                                type: LoginAppActions.LoginSetField,
                                payload: { field: "username", value: e.target.value },
                            })
                        }
                    />
                </div>
                <div className="row">
                    <img src={iconLock} alt="lock" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            dispatch({
                                type: LoginAppActions.LoginSetField,
                                payload: { field: "password", value: e.target.value },
                            })
                        }
                    />
                </div>
                <a href="#" className="pass" onClick={() => dispatch({ type: LoginAppActions.LoginSetField, payload: { field: "showModal", value: true } })}>
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
                                        onChange={(e) =>
                                            dispatch({
                                                type: LoginAppActions.LoginSetField,
                                                payload: { field: "email", value: e.target.value },
                                            })
                                        }
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