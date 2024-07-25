import { Link } from "react-router-dom";
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import xIcon from "../assets/x.png";
import linkedInIcon from "../assets/linkedin.png";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <Link to="/">
        <div className="footerLogo">
          <h2>MYLE NOW</h2>
        </div>
      </Link>
      <div className="links">
        <section>
          <h3>COMPANY</h3>
          <Link to="/about">
            <p>About</p>
          </Link>
          <Link to="/">
            <p>Contact</p>
          </Link>
        </section>

        <section>
          <h3>FOR CUSTOMERS</h3>
          <Link to="/cart">
            <p>Cart</p>
          </Link>
          <Link to="/orders">
            <p>Orders</p>
          </Link>
          <Link to="/">
            <p>Discover Categories</p>
          </Link>
        </section>

        <section>
          <h3>FOR PARTNERS</h3>
          <Link to="/">
            <p>Register as Professional</p>
          </Link>
        </section>
      </div>

      <div className="socialMedia">
        <Link to="/">
          <img src={facebookIcon} alt=""></img>
        </Link>
        <Link to="/">
          <img src={instagramIcon} alt=""></img>
        </Link>
        <Link to="/">
          <img src={xIcon} alt=""></img>
        </Link>
        <Link to="/">
          <img src={linkedInIcon} alt=""></img>
        </Link>
      </div>

      <div className="copyright">
        <p>&copy; 2024 MyleNow. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
