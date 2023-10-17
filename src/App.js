// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ModalPopup from "./components/ModalPopup";
// import Navbar from "./common/Navbar";
// import SubNavbar from "./common/SubNav";
// import RenderPost from "./components/RenderPost";
// import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.css";
// import Packages from "./pages/Packages";
// import Video from "./pages/Video";
// import HeroSection from "./pages/HeroSection";
// import { ToastContainer } from "react-toastify";

// function App() {
//   const [showPostModal, setShowPostModal] = useState(false);

//   useEffect(() => {
//     const hasVisitedPostRoute = localStorage.getItem("visitedPostRoute");
//     if (!hasVisitedPostRoute) {
//       setShowPostModal(true);
//     }
//   }, []);

//   const closeModal = () => {
//     setShowPostModal(false);
//   };

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <div>
//                 <Navbar />
//                 <section id="hero">
//                   <HeroSection />
//                 </section>

//                 <section id="video">
//                   <Video />
//                 </section>

//                 <section id="pricing">
//                   <Packages />
//                 </section>
//               </div>
//             }
//           />
//           <Route
//             path="/post"
//             element={
//               <div>
//                 <SubNavbar />
//                 <RenderPost />
//               </div>
//             }
//           />
//         </Routes>
//       </BrowserRouter>

//       {showPostModal && <ModalPopup onClose={closeModal} />}

//       <ToastContainer />
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModalPopup from "./components/ModalPopup";
import Navbar from "./common/Navbar";
import SubNavbar from "./common/SubNav";
import RenderPost from "./components/RenderPost";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import Packages from "./pages/Packages";
import Video from "./pages/Video";
import HeroSection from "./pages/HeroSection";
import { ToastContainer } from "react-toastify";

function App() {
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    const hasVisitedPostRoute = localStorage.getItem("visitedPostRoute");
    if (!hasVisitedPostRoute) {
      setShowPostModal(true);
    }
  }, []);

  const closeModal = () => {
    setShowPostModal(false);
  };

  // Add a state to track whether the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(showPostModal);
  }, [showPostModal]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                <section id="hero">
                  <HeroSection />
                </section>

                <section id="video">
                  <Video />
                </section>

                <section id="pricing">
                  <Packages />
                </section>
              </div>
            }
          />
          <Route
            path="/post"
            element={
              <div>
                <SubNavbar />
                <RenderPost />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>

      {isModalOpen && <ModalPopup onClose={closeModal} />}

      <ToastContainer />
    </div>
  );
}

export default App;
