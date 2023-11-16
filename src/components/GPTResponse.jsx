import React, { useState, useRef } from "react";
import "../style/GPTResponse.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import EditPostModal from "./EditPostModal";

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
        console.log(response.data);
        console.log("Break It Up - prompt --> ", response.data.prompt);
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
      console.log("loading...");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/changeHook`,
        { content: Text }
      );

      if (response.data.message) {
        console.log(response.data);
        console.log("Change Hook - prompt --> ", response.data.prompt);
        setText(response.data.message.content);
        // HandleGPTResponse(response.data.message.content);
        // console.log("Prompt" , response.data.prompt);
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
      console.log("loading...");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/changeTease`,
        { content: Text }
      );

      if (response.data.message) {
        console.log(response.data);
        console.log("Change Tease - prompt --> ", response.data.prompt);
        setText(response.data.message.content);
        // HandleGPTResponse(response.data.message.content);
        // console.log("Prompt" , response.data.prompt);
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
      console.log("loading...");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/changeValue`,
        { content: Text }
      );

      if (response.data.message) {
        console.log(response.data);
        console.log("Change Value - prompt --> ", response.data.prompt);
        setText(response.data.message.content);
        // HandleGPTResponse(response.data.message.content);
        // console.log("Prompt" , response.data.prompt);
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
      console.log("loading...");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/changeCTA`,
        { content: Text }
      );

      if (response.data.message) {
        console.log(response.data);
        console.log("Change CTA - prompt --> ", response.data.prompt);
        setText(response.data.message.content);
        // HandleGPTResponse(response.data.message.content);
        // console.log("Prompt" , response.data.prompt);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when the request completes.
    }
  };

  const handleSavePost = async () => {
    try {
      console.log("qqqqqqqqqqqqq", query);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/savepost`,
        { content: message, username: username, question: query }
      );

      if (response.data.message) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
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
        <div className="responseCardContainer">
          <div className="responseCard">
            <pre className="responseText" ref={pRef}>
              {Text ? Text : message}
            </pre>
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
                </div>
              </div>
            )}
            {copiedText && <div className="copiedMessage">Copied!</div>}
            {editPost && <EditPostModal message={message} onClose={onClose} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GPTResponse;
