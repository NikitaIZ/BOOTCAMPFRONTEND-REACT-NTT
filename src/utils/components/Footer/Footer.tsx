import { FC } from "react";
import facebookLogo from "../../../assets/facebook.svg";
import instagramLogo from "../../../assets/instagram.svg";
import './Footer.css';

const Footer: FC = () => {
  return (
    <footer>
      <div className="footer-social">
        <h3>Follow us on our social networks</h3>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramLogo} alt="instagram" />
          </a>
        </div>
      </div>
      <p>&copy; 2024 My Super Market. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
