import React, { useState, useRef } from "react";
import "../style/GPTResponse.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function GPTResponse({ message }) {
  const [copiedText, setCopiedText] = useState("");
  const [Text, setText] = useState("");
  const pRef = useRef(null);

  const handleTryNowClick = () => {
    window.location.reload();
  };

  const handleBreakItUp = async () => {
    try {
      console.log('loading...')
      const response = await axios.post('http://localhost:3000/api/breakItUp', { content: message });

      if (response.data.message) {
        console.log(response.data);
        console.log("Break It Up - prompt --> ", response.data.prompt);
        setText(response.data.message.content);
        // HandleGPTResponse(response.data.message.content);
        // console.log("Prompt" , response.data.prompt);
      }
    }
    catch (error) {
      console.log(error);
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
              {
              Text?Text:message
              }
              
              </pre>
            <button className="btn copy" onClick={handleCopyClick}>
              Copy
            </button>
            {copiedText && <div className="copiedMessage">Copied!</div>}
          </div>
        </div>
      </div>
      <div className="GPTButtons">
        <button className="TryNow" onClick={handleTryNowClick}>
          Generate More
        </button>
        <button className="TryNoww" onClick={handleBreakItUp}>
          Break It Up
        </button>
      </div>
    </div>
  );
}

export default GPTResponse;
