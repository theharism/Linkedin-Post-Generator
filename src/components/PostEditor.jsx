import React, { useState } from "react";
import "../style/PostEditor.css";
import Footer from "../common/Footer";
import LinkedinPreview from "./linkedinPreview";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostEditor = () => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <div className="PostEditorContainer container">
        <h2>LinkedIn Post Preview</h2>
      </div>
      <div className="PostEditorSubContainer">
        {/* <div className="CKEditor"> */}
        {/* <CKEditor
            editor={ClassicEditor}
            data={message}
            onReady={(editor) => {
              console.log("Type your post here...", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setMessage(data);
            }}
          /> */}
        <textarea
          className="TextArea"
          placeholder="Type your post here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <LinkedinPreview content={message} />
      </div>
    </div>
  );
};

export default PostEditor;
