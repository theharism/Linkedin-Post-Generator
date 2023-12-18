import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalPopup from "./ModalPopup";
import { FaPencilAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "../style/HeroSection.css";
import Swal from "sweetalert2";
import ShowUpgrade from "./ShowUpgrade";

const GeneratePost = () => {
  const authState = useSelector((state) => state.Auth.authState);
  const points = useSelector((state) => state.Points.points);
  const type = useSelector((state) => state.Subscription.type);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showUpgradeModal, setshowUpgradeModal] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowPostModal(false);
  };

  const showModal = () => {
    setShowPostModal(true);
  };

  const closeUpgradeModalfunc = () => {
    setshowUpgradeModal(false);
  };

  const showUpgradeModalfunc = () => {
    setshowUpgradeModal(true);
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

  const showUpgrade = () => {
    Swal.fire({
      title: "Please upgrade to Pro for access",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/linkedin-post-generator-bcd8d.appspot.com/o/preview.jpg?alt=media&token=e2219e31-1be8-4527-97ab-e6e9684276db",
      confirmButtonText: "Try now with your Pro Subscription",
      confirmButtonColor: "#150261",
    });
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
              {type.startsWith("S") ? (
                <Link
                  to={"/editor"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  className="FormLinks"
                >
                  <button style={{ position: "relative", marginTop: 15 }}>
                    LinkedIn Post Preview
                    <FaMagnifyingGlass className="Pencil" />
                  </button>
                </Link>
              ) : (
                <ScrollLink
                  to="pricing"
                  spy={true}
                  smooth={true}
                  duration={2500}
                  offset={0}
                  style={{ textDecoration: "none", color: "white" }}
                  className="FormLinks"
                >
                  <button
                    style={{ position: "relative", marginTop: 15 }}
                    onClick={showUpgradeModalfunc}
                  >
                    LinkedIn Post Preview
                    <FaMagnifyingGlass className="Pencil" />
                  </button>
                </ScrollLink>
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
              </ScrollLink>

              <ScrollLink
                onClick={showError}
                smooth={true}
                duration={80}
                offset={30}
                className="FormLinks"
              >
                <button style={{ position: "relative", marginTop: 15 }}>
                  LinkedIn Post Preview
                  <FaMagnifyingGlass className="Pencil" />
                </button>
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

          <ScrollLink
            smooth={true}
            duration={1000}
            offset={30}
            className="FormLinks"
          >
            <button
              style={{ position: "relative", marginTop: 15 }}
              onClick={showModal}
              className="FormLinks"
            >
              LinkedIn Post Preview
              <FaMagnifyingGlass className="Pencil" />
            </button>
          </ScrollLink>
        </div>
      )}

      {showPostModal && <ModalPopup state={true} onClose={closeModal} />}
      {showUpgradeModal && <ShowUpgrade onClose={closeUpgradeModalfunc} />}
    </>
  );
};

export default GeneratePost;
