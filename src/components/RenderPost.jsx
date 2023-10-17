import React, { useState } from "react";
import GPTResponse from "./GPTResponse";
import Main from "./Main";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Card from "./Cards";
import emojiStrip from "emoji-strip";

const RenderPost = () => {
  const [loading, setLoading] = useState(false);
  const [showGPTResponse, setShowGPTResponse] = useState(false);
  const [response, setResponse] = useState("");

  const HandleGPTResponse = (data) => {
    const responseWithoutEmojis = emojiStrip(data);
    setResponse(responseWithoutEmojis);
    setShowGPTResponse(true);
    setLoading(false);
  };

  const handleLoading = () => {
    setLoading(true);
    setShowGPTResponse(false);
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const centerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  return (
    <div>
      {loading ? (
        <div style={centerContainerStyle}>
          <ClipLoader
            color={"#000000"}
            loading={true}
            css={override}
            size={70}
          />
        </div>
      ) : showGPTResponse ? (
        <GPTResponse message={response} />
      ) : (
        <>
          <Main onPress={handleLoading} HandleGPTResponse={HandleGPTResponse} />
        </>
      )}
      <Card />
    </div>
  );
};

export default RenderPost;
