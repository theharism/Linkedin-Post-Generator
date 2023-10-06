import React, { useState } from "react";
import GPTResponse from "./components/GPTResponse";
import Main from "./components/Main";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Navbar from "./common/Navbar";
import Card from "./components/Cards";
import Footer from "./common/Footer";
import emojiStrip from "emoji-strip";

function App() {
  const [loading, setLoading] = useState(false);
  const [showGPTResponse, setShowGPTResponse] = useState(false);
  const [response, setResponse] = useState("");

  const HandleGPTResponse = (data) => {
    const responseWithoutEmojis = emojiStrip(data);
    console.log(responseWithoutEmojis);
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
      <Navbar />
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
      <Footer />
    </div>
  );
}

export default App;
