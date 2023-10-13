import React from "react";
import "../style/Video.css";
const Video = () => {
  return (
    <div className="video-section">
      <div className="content">
        <p>Simple</p>
        <h4>Easy-to-use Interface</h4>
        <p>
          Give us input, we give the output (up to you to change that if you
          deem something better).
        </p>
      </div>
      <div className="video-container">
        {/* Add your video element here */}
        <iframe
          title="Video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/your-video-id"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
