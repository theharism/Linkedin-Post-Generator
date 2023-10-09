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
        setCopiedText(textToCopy);
        setTimeout(() => {
          setCopiedText("");
        }, 2000);
      });
    }
  };

  return (
    <div className="container GPTcontainer">
      <h2 className="RepsonseText">GENERATED POST</h2>
      <div className="responseCardContainer">
        <div className="responseCard">
          <pre className="responseText">{message}</pre>
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
