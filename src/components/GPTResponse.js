import React, { useState, useRef } from "react";
import "../style/GPTResponse.css";
import "bootstrap/dist/css/bootstrap.min.css";

function GPTResponse({ message }) {
  const [copiedText, setCopiedText] = useState(""); // State to store the copied text
  const pRef = useRef(null); // Reference to the <p> element

  const handleTryNowClick = () => {
    window.location.reload();
  };

  const handleCopyClick = () => {
    if (pRef.current) {
      const textToCopy = pRef.current.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedText(textToCopy); // Update the state to show that text is copied
        setTimeout(() => {
          setCopiedText(""); // Clear the copied text message after a few seconds
        }, 2000); // 2 seconds
      });
    }
  };

  return (
    <div className="container GPTcontainer">
      <h2 className="RepsonseText">GENERATED POST</h2>
      <div className="responseCardContainer">
        <div className="responseCard">
          <p ref={pRef}>
           {message}
          </p>
          <button className="btn copy" onClick={handleCopyClick}>
            Copy
          </button>
          {copiedText && <div className="copiedMessage">Copied!</div>}
        </div>
      </div>
      <button className="TryNow" onClick={handleTryNowClick}>
        Generate More
      </button>
    </div>
  );
}

export default GPTResponse;
