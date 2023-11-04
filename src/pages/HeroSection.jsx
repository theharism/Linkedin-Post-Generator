import React, { useState } from "react";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import "../style/HeroSection.css";
import Logo from "../images/FinalLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalPopup from "../components/ModalPopup";
const HeroSection = () => {
  const authState = useSelector((state) => state.Auth.authState);

  const [showPostModal, setShowPostModal] = useState(false);

  const closeModal = () => {
    setShowPostModal(false);
  };

  const showModal = () => {
    setShowPostModal(true);
  };

  return (
    <div className="Container">
      <div className="Section">
        <div className="HeroLogo">
          <img src={Logo} alt="logo" className="HeroInsideLogo" />
        </div>
        <h4>
          Create hyper-personalized content using Muse, the #1 LinkedIn content
          writing tool
        </h4>
        <div>
          <div
            className="CheckSection"
            style={{ display: "flex", alignItems: "baseline" }}
          >
            <span>
              <FaCheck className="check" size={20} />
            </span>
            <p style={{ margin: "0" }}> Your voice</p>
          </div>
          <div
            className="CheckSection"
            style={{ display: "flex", alignItems: "baseline" }}
          >
            <span>
              <FaCheck className="check" size={20} />
            </span>
            <p style={{ margin: "0" }}>
              {" "}
              Non-robotic / Non-Ai sounding content
            </p>
          </div>
          <div
            className="CheckSection"
            style={{ display: "flex", alignItems: "baseline" }}
          >
            <span>
              <FaCheck className="check" size={20} />
            </span>
            <p style={{ margin: "0" }}>
              {" "}
              Create months worth of content in minutes
            </p>
          </div>
        </div>
      </div>

      {authState ? (
        <div className="formHero">
          <Link
            to={"/post"}
            style={{ textDecoration: "none", color: "white" }}
            className="FormLinks"
          >
            <button style={{ position: "relative" }}>
              Create Your First Post
              <FaPencilAlt className="Pencil" />
            </button>
          </Link>
        </div>
      ) : (
        <div className="formHero">
          <Link
            onClick={showModal}
            style={{ textDecoration: "none", color: "white" }}
            className="FormLinks"
          >
            <button style={{ position: "relative" }}>
              Create Your First Post
              <FaPencilAlt className="Pencil" />
            </button>
          </Link>
        </div>
      )}

      {showPostModal && <ModalPopup state={true} onClose={closeModal} />}
    </div>
  );
};

export default HeroSection;
