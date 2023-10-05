import React, { useState, useEffect } from "react";
import GPTResponse from "./components/GPTResponse";
import Main from "./components/Main";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Navbar from "./common/Navbar";
import Card from "./components/Cards";
import Footer from "./common/Footer";

function App() {
  const [loading, setLoading] = useState(false);
  const [showGPTResponse, setShowGPTResponse] = useState(false);
  const [response, setResponse] = useState("");

  const HandleGPTResponse = (data) => {
    setResponse(data);
  };
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setShowGPTResponse(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleLoading = () => {
    setLoading(true);
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
