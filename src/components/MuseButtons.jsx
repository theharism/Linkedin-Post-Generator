import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

export const MuseLinkButton = ({ text, handleOnClick, icon }) => {
  return (
    <Link
      to={handleOnClick}
      style={{ textDecoration: "none", color: "white", margin: "7px 0px" }}
      className="FormLinks"
    >
      <button style={{ position: "relative", width: 260 }}>
        {text}
        {icon}
      </button>
    </Link>
  );
};

export const MuseScrollLinkButton = ({ text, icon, handleOnClick }) => {
  return (
    <ScrollLink
      to="pricing"
      smooth={true}
      duration={1000}
      offset={30}
      className="FormLinks"
      style={{ margin: "7px 0px" }}
    >
      <button
        style={{ position: "relative", width: 260 }}
        onClick={handleOnClick}
        className="FormLinks"
      >
        {text}
        {icon}
      </button>
    </ScrollLink>
  );
};

export const MuseButton = ({ handleOnClick, icon, text }) => {
  return (
    <button
      onClick={handleOnClick}
      style={{
        textDecoration: "none",
        color: "white",
        border: "none",
        margin: "7px 0px",
      }}
      className="FormLinks"
    >
      <button style={{ position: "relative", width: 260 }}>
        {text}
        {icon}
      </button>
    </button>
  );
};
