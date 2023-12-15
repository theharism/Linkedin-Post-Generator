import React, { useState } from "react";
import "../style/PostEditor.css";
import LinkedInPost from "./LinkedInPost";
import Footer from "../common/Footer";
import Fahad from "./linkedinPreview";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostEditor = () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="PostEditorContainer container">
        <h2>How your post will look like on LinkedIn</h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        {/* <textarea
          style={{
            width: "40%", // Adjust the width as needed
            height: "230px", // Adjust the height as needed
            padding: "8px", // Add padding for better visualization
            borderRadius: "8px", // Add rounded corners
            border: "1px solid #ccc", // Add a border
            marginTop: 5,
          }}
          placeholder="Type your post here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        /> */}
        <CKEditor
          editor={ClassicEditor}
          data={message}
          onReady={(editor) => {
            console.log("Type your post here...", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setMessage(data);
            console.log({ event, editor, data });
          }}
        />
        <Fahad content={message} />
      </div>
    </>
  );
};

export default PostEditor;
