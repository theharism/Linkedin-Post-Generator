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
    <div style={{ overflow: "scroll" }}>
      <div className="PostEditorContainer container">
        <h2>How your post will look like on LinkedIn</h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-around",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <div
          style={{
            maxWidth: "500px",
          }}
        >
          <CKEditor
            editor={ClassicEditor}
            data={message}
            onReady={(editor) => {
              console.log("Type your post here...", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setMessage(data);
            }}
          />
        </div>
        <Fahad content={message} />
      </div>
    </div>
  );
};

export default PostEditor;
