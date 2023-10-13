import React, { useState } from "react";
import GPTResponse from "./components/GPTResponse";
import Main from "./components/Main";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Navbar from "./common/Navbar";
import Card from "./components/Cards";
import Footer from "./common/Footer";
import emojiStrip from "emoji-strip";
import HeroSection from "./pages/HeroSection";
import Video from "./pages/Video";
import Packages from "./pages/Packages";
import Affiliates from "./pages/Affiliates";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RenderPost from "./components/RenderPost";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <HeroSection />
                <Video />
                <Packages />
                <Affiliates />
              </div>
            }
          />
          <Route path="/post" element={<RenderPost />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
