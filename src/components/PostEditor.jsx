import React, { useState } from "react";
import "../style/PostEditor.css";
import LinkedInPost from "./LinkedInPost";
import Footer from "../common/Footer";
import LinkedinPreview from "./linkedinPreview";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostEditor = () => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <div className="PostEditorContainer container">
        <h2>How your post will look like on LinkedIn</h2>
      </div>
      <div className="PostEditorSubContainer">
        <div className="CKEditor">
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
        <LinkedinPreview content={message} />
      </div>
    </div>
  );
};

export default PostEditor;
