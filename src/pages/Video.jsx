import React from "react";
import "../style/Video.css"
const Video = () => {
  return (
    <div className="video-section">
      <div className="content">
        <p>How it Works</p>
        <h4>Upload. Generate. Publish.</h4>
        <p>
          Simple, easy-to-use interface. Import your media, generate content,
          and export anywhere.
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
