import React, { useState } from "react";
import GPTResponse from "./GPTResponse";
import Main from "./Main";
import { css } from "@emotion/react";
import Card from "./Cards";
import emojiStrip from "emoji-strip";
import { Typography } from "@mui/material";

const RenderPost = () => {
  const [loading, setLoading] = useState(false);
  const [showGPTResponse, setShowGPTResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [query, setQuery] = useState("");

  const HandleGPTResponse = (data, ques) => {
    const responseWithoutEmojis = emojiStrip(data);
    setResponse(responseWithoutEmojis);
    setShowGPTResponse(true);
    setQuery(ques);
    setLoading(false);
  };

  const handleLoading = () => {
    setLoading(true);
    setShowGPTResponse(false);
  };

  const ifEdited = (newResponse) => {
    if (newResponse) {
      setResponse(newResponse);
    }
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const centerContainerStyle = {
    display: "flex",
    flexDirection: "column", // Align items in a column
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div>
      {loading ? (
        <div style={centerContainerStyle}>
          <img
            src={require("../images/loading.gif")} // Replace with the path to your GIF image
            alt="Animated GIF"
            width="200" // Adjust the width as needed
            height="200" // Adjust the height as needed
          />
          <h6>Your Post is being Mused, this will take a moment</h6>
        </div>
      ) : showGPTResponse ? (
        <GPTResponse message={response} query={query} ifEdited={ifEdited} />
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
