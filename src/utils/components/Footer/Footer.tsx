import { FC } from "react";
import { Link } from "react-router-dom";

import facebookLogo from "../../../assets/facebook.svg";
import instagramLogo from "../../../assets/instagram.svg";

import './Footer.css'

const Footer: FC = () => {
  return (
    <footer>
      <div className="footer-social">
        <h3>Follow us on our social networks</h3>
        <div className="social-icons">
          <Link to="https://www.facebook.com">
            <img src={facebookLogo} alt="facebook" />
          </Link>
          <Link to="https://www.instagram.com">
            <img src={instagramLogo} alt="facebook" />
          </Link>
        </div>
      </div>
      <p>&copy; 2024 My Super Market. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
