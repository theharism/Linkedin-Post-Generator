import React from "react";
import "../style/Video.css";
const Video = () => {
  return (
    <div className="video-section">
      <div className="content">
        <p>Product Demo</p>
        <h4>Easy-to-use Interface</h4>
        <p>Give us input, we give the output.</p>
      </div>
      <div className="video-container">
        <iframe
          src="https://www.loom.com/embed/771e91aa2e16436a91d9d4e809fc81b1?sid=09f78593-3ac3-4bb0-a1f7-fa2b2938d7ee?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
          title="Video"
          width="560"
          height="315"
          webkitallowfullscreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
