import React, { useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ModelContent from "../pages/ModelContent";
import { Modal } from "../pages/Packages";
import "../style/Footer.css";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="footerStyle">
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
          className="linkStyle"
          href="http://www.linkedin.com/company/musetool"
          target="_blank"
        >
          <LinkedInIcon />
        </a>
        <a className="linkStyle" onClick={openModal}>
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
