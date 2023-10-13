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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/Navbar.css";
import logoImage from "../images/FinalLogo.png";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

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
          <ScrollLink to="/" className="LOGOLink">
            <img src={logoImage} alt="logo" className="LOGOImg" />
          </ScrollLink>
        </div>
      </div>
      <nav className={isMobileMenuOpen ? "responsive_nav" : ""}>
        <ScrollLink
          to="pricing"
          spy={true}
          smooth={true}
          duration={80}
          offset={200}
          onClick={closeMobileMenu}
          className="Link"
        >
          Pricing
        </ScrollLink>
        <ScrollLink
          to="affiliates"
          spy={true}
          smooth={true}
          duration={200}
          offset={30}
          onClick={closeMobileMenu}
          className="Link"
        >
          Affiliates
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
