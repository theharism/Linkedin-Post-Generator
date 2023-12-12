import React, { useState } from "react";
import "../style/PostEditor.css";
import LinkedInPost from "./LinkedInPost";
import Footer from "../common/Footer";

const PostEditor = () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <textarea
          style={{
            width: "40%", // Adjust the width as needed
            height: "200px", // Adjust the height as needed
            padding: "8px", // Add padding for better visualization
            borderRadius: "8px", // Add rounded corners
            border: "1px solid #ccc", // Add a border
            marginTop: 20,
          }}
          placeholder="Type your post here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <LinkedInPost message={message} />
      </div>
    </>
  );
};

export default PostEditor;
