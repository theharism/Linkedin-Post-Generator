import React, { useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ModelContent from "../pages/ModelContent";
import { Modal } from "../pages/Packages";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const footerStyle = {
    display: "flex",
    justifyContent: "space-between", // Space between items
    alignItems: "center",
    backgroundColor: "#150261",
    height: "60px",
    padding: "0 20px", // Add padding to create space around items
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px", // Adjust the gap between icon and text
    textDecoration: "none",
    color: "white",
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={footerStyle}>
      <div style={{ color: "white" }}>
        &#169; 2023 The Muse Tool - All Rights Reserved
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <a
          style={linkStyle}
          href="https://www.linkedin.com/company/themusetool/about/?viewAsMember=true"
          target="_blank"
        >
          <LinkedInIcon />
        </a>
        <a style={linkStyle} onClick={openModal}>
          Contact Us
        </a>
      </div>

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <ModelContent closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Footer;
