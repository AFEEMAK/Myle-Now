import { Link } from "react-router-dom";
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import xIcon from "../assets/x.png";
import linkedInIcon from "../assets/linkedin.png";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <Link  aria-label="home" to="/">
        <div className="footerLogo">
          <h2>MYLE NOW</h2>
        </div>
      </Link>
      <div className="links">
        <section>
          <h3>COMPANY</h3>
          <Link  aria-label="home"  to="/about">
            <p>About</p>
          </Link>
          <Link  aria-label="home"  to="/">
            <p>Contact</p>
          </Link>
        </section>

        <section>
          <h3>FOR CUSTOMERS</h3>
          <Link  aria-label="open cart page"  to="/cart">
            <p>Cart</p>
          </Link>
          <Link  aria-label="open orders page"  to="/orders">
            <p>Orders</p>
          </Link>
          <Link  aria-label="open home"  to="/">
            <p>Discover Categories</p>
          </Link>
        </section>

        <section>
          <h3>FOR PARTNERS</h3>
          <Link  aria-label="open home"  to="/">
            <p>Register as Professional</p>
          </Link>
        </section>
      </div>

      <div className="socialMedia">
        <Link  aria-label="open facebook"  to="/">
          <img src={facebookIcon} alt="fb"></img>
        </Link>
        <Link  aria-label="open facebook"  to="/">
          <img src={instagramIcon} alt="insta"></img>
        </Link>
        <Link  aria-label="open home" to="/">
          <img src={xIcon} alt="x"></img>
        </Link>
        <Link  aria-label="open home"  to="/">
          <img src={linkedInIcon} alt="linkedin"></img>
        </Link>
      </div>

      <div className="copyright">
        <p>&copy; 2024 MyleNow. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
