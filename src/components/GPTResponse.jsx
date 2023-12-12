import React, { useState, useRef } from "react";
import "../style/GPTResponse.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import EditPostModal from "./EditPostModal";
import Swal from "sweetalert2";
import LinkedInPost from "./LinkedInPost";

function GPTResponse({ message, query, ifEdited }) {
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [editPost, setEditPost] = useState(false);
  const [Text, setText] = useState("");
  const pRef = useRef(null);

  const username = useSelector((state) => state.User.username);

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
    if (pRef.current) {
      const textToCopy = pRef.current.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedText(textToCopy);
        setTimeout(() => {
          setCopiedText("");
        }, 2000);
      });
    }
  };

  return (
    <div className="ModiContainer">
      <div className="GPTcontainer">
        <h2 className="RepsonseText">GENERATED POST</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LinkedInPost message={Text ? Text : message} />
        </div>

        <button className="btn copy" onClick={handleCopyClick}>
          Copy
        </button>

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
