import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalPopup from "./ModalPopup";
import { FaPencilAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "../style/HeroSection.css";
import Swal from "sweetalert2";

const GeneratePost = () => {
  const authState = useSelector((state) => state.Auth.authState);
  const points = useSelector((state) => state.Points.points);
  const type = useSelector((state) => state.Subscription.type);
  const [showPostModal, setShowPostModal] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowPostModal(false);
  };

  const showModal = () => {
    setShowPostModal(true);
  };

  const showError = () => {
    navigate("/");
    Swal.fire({
      title: "Out of Credits. Upgrade your plan to Muse",
      icon: "error",
      showConfirmButton: false, // Hide the "OK" button in the success popup
      timer: 1500,
    });
  };

  const showEditor = () => {
    navigate("/editor");
  };

  return (
    <>
      {authState ? (
        <div className="formHero">
          {points > 0 ? (
            <>
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
              {type.startsWith("Pro") && (
                <p className="looksOnLinkedIn" onClick={showEditor}>
                  See how it looks on LinkedIn
                </p>
              )}
            </>
          ) : (
            <>
              <ScrollLink
                onClick={showError}
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
                {type.startsWith("Pro") && (
                  <p className="looksOnLinkedIn" onClick={showError}>
                    See how it looks on LinkedIn
                  </p>
                )}
              </ScrollLink>
            </>
          )}
        </div>
      ) : (
        <div className="formHero">
          <br />
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

          {type.startsWith("Pro") && (
            <p className="looksOnLinkedIn" onClick={showModal}>
              See how it looks on LinkedIn
            </p>
          )}
        </div>
      )}

      {showPostModal && <ModalPopup state={true} onClose={closeModal} />}
    </>
  );
};

export default GeneratePost;
