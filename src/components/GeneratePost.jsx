import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalPopup from "./ModalPopup";
import { FaPencilAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../style/HeroSection.css";
import Swal from "sweetalert2";
import CheckIcon from "@mui/icons-material/Check";
import ShowUpgrade from "./ShowUpgrade";
import MetadataModal from "./MetadataModal";
import OptimizePostModal from "./OptimizePostModal";
import {
  MuseButton,
  MuseLinkButton,
  MuseScrollLinkButton,
} from "./MuseButtons";

const GeneratePost = () => {
  const { authState, currentUserId } = useSelector((state) => state.Auth);
  const { email, metadataAsked } = useSelector((state) => state.User);
  const { points, type } = useSelector((state) => state.Subscription);
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
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const closeMetadataModalfunc = () => {
    navigate("/post");
    setShowMetadataModal(false);
  };

  const handleOnClick = () => {
    setShowMetadataModal(true);
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
          {points > 0 || currentUserId !== email ? (
            <>
              {metadataAsked ? (
                <MuseLinkButton
                  handleOnClick={"/post"}
                  text={"Create Your First Post"}
                  icon={<FaPencilAlt className="Pencil" />}
                />
              ) : (
                <MuseButton
                  handleOnClick={handleOnClick}
                  text={"Create Your First Post"}
                  icon={<FaPencilAlt className="Pencil" />}
                />
              )}

              {type?.startsWith("Pro") ? (
                <>
                  <MuseLinkButton
                    handleOnClick={"/editor"}
                    text={"LinkedIn Post Preview"}
                    icon={<FaMagnifyingGlass className="Pencil" />}
                  />

                  <MuseButton
                    handleOnClick={handleOptimizeClick}
                    text={"Optimize Your Post"}
                    icon={
                      <CheckIcon className="CheckMark" sx={{ fontSize: 60 }} />
                    }
                  />
                </>
              ) : (
                <>
                  {[...Array(2)].map((_, index) => (
                    <MuseScrollLinkButton
                      handleOnClick={
                        index === 0
                          ? () => showUpgradeModalfunc(1)
                          : () => showUpgradeModalfunc(2)
                      }
                      text={
                        index === 0
                          ? "LinkedIn Post Preview"
                          : "Optimize Your Post"
                      }
                      icon={
                        index === 0 ? (
                          <FaMagnifyingGlass className="Pencil" />
                        ) : (
                          <CheckIcon
                            className="CheckMark"
                            sx={{ fontSize: 60 }}
                          />
                        )
                      }
                    />
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {[...Array(3)].map((_, index) => (
                <MuseButton
                  key={index}
                  handleOnClick={showError}
                  text={
                    index === 0
                      ? "Create Your First Post"
                      : index === 1
                      ? "LinkedIn Post Preview"
                      : "Optimize Your Post"
                  }
                  icon={
                    index === 0 ? (
                      <FaPencilAlt className="Pencil" />
                    ) : index === 1 ? (
                      <FaMagnifyingGlass className="Pencil" />
                    ) : (
                      <CheckIcon className="CheckMark" sx={{ fontSize: 60 }} />
                    )
                  }
                />
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="formHero">
          {[...Array(3)].map((_, index) => (
            <MuseButton
              key={index}
              handleOnClick={showModal}
              text={
                index === 0
                  ? "Create Your First Post"
                  : index === 1
                  ? "LinkedIn Post Preview"
                  : "Optimize Your Post"
              }
              icon={
                index === 0 ? (
                  <FaPencilAlt className="Pencil" />
                ) : index === 1 ? (
                  <FaMagnifyingGlass className="Pencil" />
                ) : (
                  <CheckIcon className="CheckMark" sx={{ fontSize: 60 }} />
                )
              }
            />
          ))}
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
