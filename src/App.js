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
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EmailVerifyModal from "./components/EmailVerifyModal";
import { useDispatch } from "react-redux";
import { resetAuthState, setAuthState } from "./slices/AuthSlice";
import { setUser } from "./slices/UserSlice";
import MyPosts from "./components/MyPosts";
import Success from "./components/Success";
import { resetSubscription, setSubscription } from "./slices/SubscriptionSlice";
import { resetPoints, setPoints } from "./slices/PointsSlice";
import Footer from "./common/Footer";
import EmailVerified from "./components/emailverified";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [localAuth, setAuth] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  useEffect(() => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      setShowEmailVerification(true);
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setAuthState());
      setAuth(true);
    } else {
      dispatch(resetAuthState());
      setAuth(false);

      localStorage.removeItem("user");
      localStorage.removeItem("subscription");
      localStorage.removeItem("points");
    }
  });

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const subscriptionString = localStorage.getItem("subscription");
    const pointsString = localStorage.getItem("points");

    if (userString) {
      const user = JSON.parse(userString);
      dispatch(setUser({ user: user, write: false }));
    }
    if (subscriptionString) {
      const sub = JSON.parse(subscriptionString);
      const temp = new Date(sub.expiresDate);
      const currentDate = new Date();
      if (temp < currentDate) {
        dispatch(resetSubscription());
        dispatch(resetPoints());
      } else {
        dispatch(setSubscription({ subscription: sub, write: false }));
      }
    }
    if (pointsString) {
      const poi = JSON.parse(pointsString);
      dispatch(setPoints({ points: poi }));
    }
  }, []);

  const onClose = () => {
    setShowEmailVerification(false);
  };

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
                <Footer />
              </div>
            }
          />
          {localAuth && (
            <>
              <Route
                path="/post"
                element={
                  <div>
                    <SubNavbar />
                    <RenderPost />
                    <Footer />
                  </div>
                }
              />

              <Route
                path="/myposts"
                element={
                  <div>
                    <SubNavbar />
                    <MyPosts />
                  </div>
                }
              />

              <Route
                path="/success"
                element={
                  <div>
                    <SubNavbar />
                    <Success />
                  </div>
                }
              />

              <Route
                path="/emailverified"
                element={
                  <div>
                    <SubNavbar />
                    <EmailVerified />
                  </div>
                }
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
      {showEmailVerification && <EmailVerifyModal onClose={onClose} />}
      <ToastContainer />
    </div>
  );
}

export default App;
