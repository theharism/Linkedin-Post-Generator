import React from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import logoImage from "../images/FinalLogo.png";

const SubNavbarComponent = () => {
  return (
    <header>
      <div className="logo-container">
        <div className="logo">
          <Link to="/" className="LOGOLink">
            <img src={logoImage} alt="logo" className="LOGOImg" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SubNavbarComponent;
