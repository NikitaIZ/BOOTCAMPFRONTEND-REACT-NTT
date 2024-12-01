import { FC } from "react";

import LoginCard from "../../../utils/components/LoginCard/LoginCard";

import './Login.css';

const Login: FC = () => {
    return (
        <div className="login">
           <LoginCard />
        </div>
    );
};

export default Login;
