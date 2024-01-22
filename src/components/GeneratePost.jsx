import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalPopup from "./ModalPopup";
import { FaPencilAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "../style/HeroSection.css";
import Swal from "sweetalert2";
import CheckIcon from "@mui/icons-material/Check";
import ShowUpgrade from "./ShowUpgrade";
import MetadataModal from "./MetadataModal";
import OptimizePostModal from "./OptimizePostModal";

const GeneratePost = () => {
  const authState = useSelector((state) => state.Auth.authState);
  const points = useSelector((state) => state.Subscription.points);
  const type = useSelector((state) => state.Subscription.type);
  const metadataAsked = useSelector((state) => state.User.metadataAsked);
  const [showPostModal, setShowPostModal] = useState(false);
  const [optimizePost, setOptimizePost] = useState(false);
  const [showUpgradeModal, setshowUpgradeModal] = useState(0);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowPostModal(false);
  };

  const showModal = () => {
    setShowPostModal(true);
  };

  const closeUpgradeModalfunc = () => {
    setshowUpgradeModal(0);
  };

  const showUpgradeModalfunc = (type) => {
    setshowUpgradeModal(type);
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

  const closeMetadataModalfunc = () => {
    window.location.href = "/post";
    setShowMetadataModal(false);
  };

  const showMetadataModalfunc = () => {
    setShowMetadataModal(true);
  };

  const handleOnClick = () => {
    if (metadataAsked) {
      window.location.href = "/post";
    } else {
      showMetadataModalfunc();
    }
  };

  const handleOptimizeClick = () => {
    setOptimizePost(true);
  };

  const closeOptimizePost = async () => {
    setOptimizePost(false);
  };

  return (
    <>
      {authState ? (
        <div className="formHero">
          {points > 0 ? (
            <>
              <Link
                onClick={handleOnClick}
                style={{ textDecoration: "none", color: "white" }}
                className="FormLinks"
              >
                <button style={{ position: "relative", width: 260 }}>
                  Create Your First Post
                  <FaPencilAlt className="Pencil" />
                </button>
              </Link>
              {type.startsWith("Pro") ? (
                <>
                  <Link
                    to={"/editor"}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    className="FormLinks"
                  >
                    <button
                      style={{
                        position: "relative",
                        marginTop: 15,
                        width: 260,
                      }}
                    >
                      LinkedIn Post Preview
                      <FaMagnifyingGlass className="Pencil" />
                    </button>
                  </Link>
                  <Link
                    onClick={handleOptimizeClick}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    className="FormLinks"
                  >
                    <button
                      style={{
                        position: "relative",
                        marginTop: 15,
                        width: 260,
                      }}
                    >
                      Optimize Your Post
                      <CheckIcon className="CheckMark" sx={{ fontSize: 60 }} />
                    </button>
                  </Link>
                </>
              ) : (
                <>
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
                      style={{
                        position: "relative",
                        marginTop: 15,
                        width: 260,
                      }}
                      onClick={() => showUpgradeModalfunc(1)}
                    >
                      LinkedIn Post Preview
                      <FaMagnifyingGlass className="Pencil" />
                    </button>
                  </ScrollLink>
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
                      style={{
                        position: "relative",
                        marginTop: 15,
                        width: 260,
                      }}
                      onClick={() => showUpgradeModalfunc(2)}
                    >
                      Optimize Your Post
                      <CheckIcon className="CheckMark" sx={{ fontSize: 60 }} />
                    </button>
                  </ScrollLink>
                </>
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
                <button style={{ position: "relative", width: 260 }}>
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
                <button
                  style={{ position: "relative", marginTop: 15, width: 260 }}
                >
                  LinkedIn Post Preview
                  <FaMagnifyingGlass className="Pencil" />
                </button>
              </ScrollLink>

              <ScrollLink
                onClick={showError}
                smooth={true}
                duration={80}
                offset={30}
                className="FormLinks"
              >
                <button
                  style={{ position: "relative", marginTop: 15, width: 260 }}
                >
                  Optimize Your Post
                  <CheckIcon className="CheckMark" sx={{ fontSize: 60 }} />
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
            <button style={{ position: "relative", width: 260 }}>
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
              style={{ position: "relative", marginTop: 15, width: 260 }}
              onClick={showModal}
              className="FormLinks"
            >
              LinkedIn Post Preview
              <FaMagnifyingGlass className="Pencil" />
            </button>
          </ScrollLink>

          <ScrollLink
            smooth={true}
            duration={1000}
            offset={30}
            className="FormLinks"
          >
            <button
              style={{ position: "relative", marginTop: 15, width: 260 }}
              onClick={showModal}
              className="FormLinks"
            >
              Optimize Your Post
              <CheckIcon className="CheckMark" sx={{ fontSize: 60 }} />
            </button>
          </ScrollLink>
        </div>
      )}

      {showPostModal && <ModalPopup state={true} onClose={closeModal} />}
      {showUpgradeModal !== 0 && (
        <ShowUpgrade type={showUpgradeModal} onClose={closeUpgradeModalfunc} />
      )}
      {showMetadataModal && <MetadataModal onClose={closeMetadataModalfunc} />}
      {optimizePost && <OptimizePostModal onClose={closeOptimizePost} />}
    </>
  );
};

export default GeneratePost;
