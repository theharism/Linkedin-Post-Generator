import React from "react";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import "../style/HeroSection.css";
import Logo from "../images/FinalLogo.png";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <div className="Container">
      <div className="Section">
        <div className="HeroLogo">
          <img src={Logo} alt="logo" className="HeroInsideLogo" />
        </div>
        <h4>
          Create hyper-personal content using Muse, the #1 LinkedIn content
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
    </div>
  );
};

export default HeroSection;
