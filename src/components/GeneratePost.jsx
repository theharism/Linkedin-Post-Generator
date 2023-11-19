import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalPopup from "./ModalPopup";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "../style/HeroSection.css";

const GeneratePost = () => {
  const authState = useSelector((state) => state.Auth.authState);
  const points = useSelector((state) => state.Points.points);
  const [showPostModal, setShowPostModal] = useState(false);

  const closeModal = () => {
    setShowPostModal(false);
  };

  const showModal = () => {
    setShowPostModal(true);
  };

  return (
    <>
      {authState ? (
        <div className="formHero">
          {points > 0 ? (
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
          ) : (
            <ScrollLink
              to="pricing"
              spy={true}
              smooth={true}
              duration={80}
              offset={30}
              style={{ textDecoration: "none", color: "white" }}
              className="FormLinks"
            >
              <button style={{ position: "relative" }}>
                Create Your First Post
                <FaPencilAlt className="Pencil" />
              </button>
            </ScrollLink>
          )}
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
    </>
  );
};

export default GeneratePost;
