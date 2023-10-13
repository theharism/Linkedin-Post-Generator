// import React from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useRef } from "react";
// import { FaHome, FaUser } from "react-icons/fa";
// import "../style/Navbar.css";
// import logoImage from "../images/FinalLogo.png";

// const NavbarComponent = () => {
//   const navref = useRef();

//   const ShowMenu = () => {
//     navref.current.classList.toggle("responsive_nav");
//   };

//   const iconStyle = { color: "black" };

//   return (
//     <header>
//       <div className="logo-container">
//         <div className="logo">
//           <Link to={"/"} className="LOGOLink">
//             <img src={logoImage} alt="logo" className="LOGOImg" />
//           </Link>
//         </div>
//       </div>
//       {/* <FaHome style={iconStyle} /> */}
//       <nav ref={navref}>
//         <Link className="Link" to={"/"}>
//           Pricing
//         </Link>
//         <Link className="Link" to="/affiliates">
//           Affiliates
//         </Link>

//         <button onClick={ShowMenu} className="nav-btn nav-close-btn">
//           <FaTimes className="Menu" />
//         </button>
//       </nav>
//       <button onClick={ShowMenu} className="nav-btn nav-open-btn">
//         <FaBars className="Menu" />
//       </button>
//     </header>
//   );
// };

// export default NavbarComponent;

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaHome, FaUser } from "react-icons/fa";
import "../style/Navbar.css";
import logoImage from "../images/FinalLogo.png";

const NavbarComponent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navref = useRef();

  const ShowMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <header>
      <div className="logo-container">
        <div className="logo">
          <Link to={"/"} className="LOGOLink">
            <img src={logoImage} alt="logo" className="LOGOImg" />
          </Link>
        </div>
      </div>
      <nav ref={navref} className={isMobileMenuOpen ? "responsive_nav" : ""}>
        <Link className="Link" to={"/"} onClick={closeMobileMenu}>
          Pricing
        </Link>
        <Link className="Link" to="/affiliates" onClick={closeMobileMenu}>
          Affiliates
        </Link>
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
