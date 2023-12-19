import React, { useState, useRef } from "react";
import "../style/GPTResponse.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import EditPostModal from "./EditPostModal";
import Swal from "sweetalert2";
import { LinkedInPost, generateLocalState } from "../constants/helper";
import LinkedinPreview from "./linkedinPreview";

function GPTResponse({ message, query, ifEdited }) {
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [editPost, setEditPost] = useState(false);
  const [Text, setText] = useState("");
  const pRef = useRef(null);
  const type = useSelector((state) => state.Subscription.type);

  const { username, email } = useSelector((state) => state.User);

  const handleTryNowClick = () => {
    window.location.reload();
  };

  const handleBreakItUp = async () => {
    setLoading(true); // Set loading to true during the request.
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/breakItUp`,
        { content: message }
      );

      if (response.data.message) {
        setText(response.data.message.content);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when the request completes.
    }
  };

  const handleMakeItShorter = async () => {
    setLoading(true); // Set loading to true during the request.
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/makeitshorter`,
        { content: message }
      );

      if (response.data.message) {
        setText(response.data.message.content);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when the request completes.
    }
  };

  const handleChangeHook = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/changeHook`,
        { content: Text }
      );

      if (response.data.message) {
        setText(response.data.message.content);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when the request completes.
    }
  };

  const handleChangeTease = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/changeTease`,
        { content: Text }
      );

      if (response.data.message) {
        setText(response.data.message.content);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when the request completes.
    }
  };
  const handleChangeValue = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/changeValue`,
        { content: Text }
      );

      if (response.data.message) {
        setText(response.data.message.content);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when the request completes.
    }
  };

  const handleChangeCTA = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/changeCTA`,
        { content: Text }
      );

      if (response.data.message) {
        setText(response.data.message.content);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when the request completes.
    }
  };

  const handleSavePost = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/savepost`,
        { content: message, username: username, question: query }
      );

      if (response.data.message) {
        Swal.fire({
          title: response.data.message,
          icon: "success",
          showConfirmButton: false, // Hide the "OK" button in the success popup
          timer: 1000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An Unexpected Error occurred", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  const handlRevertPost = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, revert it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = localStorage.getItem("response");
        setText(response);
      }
    });
  };

  const handleEditPost = () => {
    setEditPost(true);
  };

  const onClose = (newMessage) => {
    setEditPost(false);
    if (newMessage) {
      ifEdited(newMessage);
    }
  };

  const handleCopyClick = () => {
    const textToCopy = Text ? Text : message;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedText(textToCopy);
      setTimeout(() => {
        setCopiedText("");
      }, 2000);
    });
  };

  const handleSharePress = async () => {
    const state = generateLocalState();
    const textToSend = Text ? Text : message;
    window.scrollTo(0, 0);

    localStorage.setItem("state", state);
    localStorage.setItem("response", textToSend);

    console.log("HaNDLE share press");

    setLoading(true);

    const status = await LinkedInPost(state, textToSend, email);
    if (status) {
      window.location.href = "/";
    }

    setLoading(false);
  };

  return (
    <div className="ModiContainer">
      <div className="GPTcontainer">
        <h2 className="RepsonseText">GENERATED POST</h2>

        {type.startsWith("Pro") ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinkedinPreview content={Text ? Text : message} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: 200,
              }}
            >
              <button className="btn copy" onClick={handleCopyClick}>
                Copy
              </button>

              <button className="share-button" onClick={handleSharePress}>
                <img
                  src={require("../images/share.png")}
                  alt="share button"
                  className="share"
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="responseCardContainer">
              <div className="responseCard">
                <pre className="responseText" ref={pRef}>
                  {Text ? Text : message}
                </pre>
                <button className="btn copy" onClick={handleCopyClick}>
                  Copy
                </button>
              </div>
            </div>
          </>
        )}

        {loading ? (
          <div className="loading-spinner-container">
            <ClipLoader color={"#123abc"} loading={loading} size={50} />
          </div>
        ) : (
          <div>
            {Text && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                  marginTop: "1rem",
                }}
                className="ChangeDiv"
              >
                <button
                  className="btn btn-primary change"
                  onClick={handleChangeHook}
                >
                  Change Hook
                </button>
                <button
                  className="btn btn-primary change"
                  onClick={handleChangeTease}
                >
                  Change Tease
                </button>
                <button
                  className="btn btn-primary change"
                  onClick={handleChangeValue}
                >
                  Change Value
                </button>
                <button
                  className="btn btn-primary change"
                  onClick={handleChangeCTA}
                >
                  Change CTA
                </button>
              </div>
            )}
            <div className="GPTButtons">
              <button
                className="btn btn-primary kuchbi"
                onClick={handleTryNowClick}
              >
                Generate More
              </button>
              <button
                className="btn btn-primary kuchbi"
                onClick={handleBreakItUp}
              >
                Break It Up
              </button>
              <button
                className="btn btn-primary kuchbi"
                onClick={handleMakeItShorter}
              >
                Make It Shorter
              </button>
              <button
                className="btn btn-primary kuchbi"
                onClick={handleEditPost}
              >
                Edit
              </button>
              <button
                className="btn btn-primary kuchbi"
                onClick={handleSavePost}
              >
                Save
              </button>
              <button
                className="btn btn-primary kuchbi"
                onClick={handlRevertPost}
              >
                Revert
              </button>
            </div>
          </div>
        )}
        {copiedText && <div className="copiedMessage">Copied!</div>}
        {editPost && <EditPostModal message={message} onClose={onClose} />}
      </div>
    </div>
  );
}

export default GPTResponse;
