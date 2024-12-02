import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mailUser from "../../../assets/mail.svg";
import useValidation from "../../../app/hooks/useValidation";

import "./RecoveryCard.css";

const RecoveryCard: FC = () => {
    const [mail, setMail] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);

    const navigate = useNavigate();
    const { isValidEmail } = useValidation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!mail.trim()) {
            setShowError(true);
            return;
        }

        if (!isValidEmail(mail)) {
            setIsEmailValid(false);
            return;
        }

        setShowError(false);
        setIsEmailValid(true);
        setShowModal(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMail(value);

        setIsEmailValid(isValidEmail(value));
        setShowError(false);
    };

    const handleModalClose = () => {
        setShowModal(false); 
        navigate("/login");
    };

    return (
        <div className="wrapper">
            <div className="title"><span>Recovery Password</span></div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <img src={mailUser} alt="mail" />
                    <input
                        type="text"
                        placeholder="Email"
                        value={mail}
                        onChange={handleChange}
                    />
                </div>
                {showError && <p className="error-message">Please fill out this field.</p>}
                {!isEmailValid && !showError && (
                    <p className="error-message">Please enter a valid email address.</p>
                )}
                <div className="row button-form">
                    <input type="submit" value="Send" />
                </div>
                <div className="signup-link">
                    <Link to="/login">Return to Login</Link>
                </div>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Email sent successfully!</p>
                        <button onClick={handleModalClose}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecoveryCard;
