import React, { useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ModelContent from "../pages/ModelContent";
import { Modal } from "../pages/Packages";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const footerStyle = {
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#150261",
    height: "60px",
    padding: "0 20px",
  };

  const mobileFooterStyle = {
    height: "60px",
    fontSize: 10,
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
    <div style={{ ...footerStyle, ...mobileFooterStyle }} className="footer">
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
          href="http://www.linkedin.com/company/musetool"
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
