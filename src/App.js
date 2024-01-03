import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { resetAuthState, setAuthState } from "./slices/AuthSlice";
import { setUser } from "./slices/UserSlice";
import MyPosts from "./components/MyPosts";
import Success from "./components/Success";
import { resetSubscription, setSubscription } from "./slices/SubscriptionSlice";
import { setPoints } from "./slices/PointsSlice";
import Footer from "./common/Footer";
import axios from "axios";
import BlockUser from "./components/BlockUser";
import UseCases from "./pages/UseCases";
import PostEditor from "./components/PostEditor";
import Testimonials from "./pages/Testimonials";
import LinkedInVerification from "./components/LinkedInVerification";
import Referral from "./components/Referral";
import AffiliateProgram from "./pages/AffiliateProgram";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [localAuth, setAuth] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showBlockUser, setShowShowBlockuser] = useState(false);
  const type = useSelector((state) => state.Subscription.type);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setAuthState());
      setAuth(true);
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        setShowEmailVerification(true);
      }
    } else {
      dispatch(resetAuthState());
      setAuth(false);

      localStorage.removeItem("user");
      localStorage.removeItem("state");
      localStorage.removeItem("response");
    }
  });

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const user = JSON.parse(userString);
      dispatch(setUser({ user: user, write: false }));

      async function fetchSubscriptionStatus() {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/userstatus`,
            {
              params: {
                email: user.email,
              },
            }
          );

          const data = response.data;

          if (data.userstatus === "blocked") {
            // Render an <h1> element with the text "Loading" when status is "active"
            setShowShowBlockuser(true);
          }

          if (data.subscriptionstatus === "active") {
            dispatch(setSubscription({ subscription: data.subscription }));
            dispatch(setPoints({ points: data.subscription.points }));
          } else {
            dispatch(resetSubscription());
            dispatch(setPoints({ points: data.subscription.points }));
          }
        } catch (error) {
          console.error("Error:", error);
          // Handle errors
        }
      }

      fetchSubscriptionStatus();
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
                <section id="Use Cases">
                  <UseCases />
                </section>
                <section id="testimonials">
                  <Testimonials />
                </section>
                <Footer />
              </div>
            }
          />
          <Route
            path="/affiliate"
            element={
              <div>
                <SubNavbar />
                <AffiliateProgram />
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
                path="/referral"
                element={
                  <div>
                    <SubNavbar />
                    <Referral />
                  </div>
                }
              />

              {type.startsWith("Pro") && (
                <>
                  <Route
                    path="/editor"
                    element={
                      <div>
                        <SubNavbar />
                        <PostEditor />
                      </div>
                    }
                  />
                  <Route
                    path="/verify"
                    element={
                      <div>
                        <SubNavbar />
                        <LinkedInVerification />
                      </div>
                    }
                  />
                </>
              )}
            </>
          )}
        </Routes>
      </BrowserRouter>
      {showEmailVerification && <EmailVerifyModal onClose={onClose} />}
      {showBlockUser && <BlockUser />}
      <ToastContainer />
    </div>
  );
}

export default App;
