import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/Navbar.css";
import logoImage from "../images/FinalLogo.png";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModalPopup from "../components/ModalPopup";
import ProfileModal from "../components/ProfileModal";
import { useSelector } from "react-redux";

const NavbarComponent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPostModal, setShowPostModal] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const authState = useSelector((state) => state.Auth.authState);

  const hideModal = () => {
    setShowPostModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const ShowMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeModal = () => {
    setShowPostModal("");
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
      <nav className={isMobileMenuOpen ? "responsive_nav" : "nav"}>
        <div className="left-nav-items">
          {authState ? (
            <Link to="/post" className="Link">
              Start Musing
            </Link>
          ) : (
            <Link onClick={() => setShowPostModal("signin")} className="Link">
              Start Musing
            </Link>
          )}

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
        </div>
        <div className="right-nav-items">
          {authState ? (
            <>
              <Link to="/myposts" className="Link">
                My Posts
              </Link>
              <AccountCircleIcon
                onClick={handleClick}
                className="account-icon"
                fontSize="medium"
              />
            </>
          ) : (
            <>
              <Link className="Link" onClick={() => setShowPostModal("signin")}>
                Sign in
              </Link>
              <Link
                className="Link"
                onClick={() => setShowPostModal("register")}
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button onClick={ShowMenu} className="nav-btn nav-close-btn">
          <FaTimes className="Menu" />
        </button>
      </nav>

      <button onClick={ShowMenu} className="nav-btn nav-open-btn">
        <FaBars className="Menu" />
      </button>

      {showPostModal === "signin" ? (
        <ModalPopup state={true} onClose={closeModal} />
      ) : null}
      {showPostModal === "register" ? (
        <ModalPopup state={false} onClose={closeModal} />
      ) : null}
      <ProfileModal anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </header>
  );
};

export default NavbarComponent;
