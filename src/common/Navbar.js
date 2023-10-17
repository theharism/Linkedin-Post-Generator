import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/Navbar.css";
import logoImage from "../images/FinalLogo.png";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ShowMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="logo-container">
        <div className="logo">
          <Link to="/" className="LOGOLink">
            <img src={logoImage} alt="logo" className="LOGOImg" />
          </Link>
        </div>
      </div>
      <nav className={isMobileMenuOpen ? "responsive_nav" : ""}>
      <Link to="/post" className="Link">
          Start Musing
        </Link>
        <ScrollLink
          to="video"
          spy={true}
          smooth={true}
          duration={200}
          offset={30}
          onClick={closeMobileMenu}
          className="Link"
        >
          How to Muse
        </ScrollLink>
        <ScrollLink
          to="pricing"
          spy={true}
          smooth={true}
          duration={80}
          offset={30}
          onClick={closeMobileMenu}
          className="Link"
        >
          Pricing
        </ScrollLink>
        <button onClick={ShowMenu} className="nav-btn nav-close-btn">
          <FaTimes className="Menu" />
        </button>
      </nav>
      <button onClick={ShowMenu} className="nav-btn nav-open-btn">
        <FaBars className="Menu" />
      </button>
    </header>
  );
};

export default NavbarComponent;
