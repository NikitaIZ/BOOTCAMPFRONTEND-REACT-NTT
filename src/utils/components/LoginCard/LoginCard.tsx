import { FC } from "react";
import iconUser from "../../../assets/user.svg";
import iconLock from "../../../assets/lock.svg";
import './LoginCard.css';

const LoginCard: FC = () => {
    return (
        <div className="wrapper">
            <div className="title"><span>Login Form</span></div>
            <form action="#">
                <div className="row">
                    <img src={iconUser} alt="user" />
                    <input type="text" placeholder="Email or Phone" required />
                </div>
                <div className="row">
                    <img src={iconLock} alt="user" />
                    <input type="password" placeholder="Password" required />
                </div>
                <div className="pass"><a href="#">Forgot password?</a></div>
                <div className="row button-form">
                    <input type="submit" value="Login" />
                </div>
                <div className="signup-link">Not a member? <a href="#">Signup now</a></div>
            </form>
        </div>
    );
};

export default LoginCard;
