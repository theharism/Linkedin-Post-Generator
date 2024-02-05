import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../style/Success.css";
import { useNavigate } from "react-router-dom";
import { LinkedInPost, LinkedinAuthentication } from "../constants/helper";
import { useSelector } from "react-redux";

const LinkedInVerification = () => {
  const state = localStorage.getItem("state");
  const text = localStorage.getItem("response");
  const [authorized, setAuthorized] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.User);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const code = urlParams.get("code");
    const queryState = urlParams.get("state");
    const error = urlParams.get("error");
    const errorDescription = urlParams.get("error_description");

    if (!state || !queryState) {
      return;
    }

    if (state === queryState) {
      setAuthorized(true);

      if (error) {
        setError(errorDescription);
        setTimeout(() => {
          navigate("/");
        }, [3000]);
        return;
      }

      async function Move() {
        const status = await LinkedinAuthentication(code, email);
        if (status) {
          setPosting(true);

          const status2 = await LinkedInPost(state, text, email);
          if (status2) {
            navigate("/");
          }
        } else {
          setError(
            "There was an error authenticating. Redirecting in 3 seconds"
          );
          setTimeout(() => {
            navigate("/");
          }, [3000]);
        }
      }

      Move();
    }
  }, [email, navigate, state, text]);

  return (
    <div className="success-wrapper">
      <div className="success">
        {authorized ? (
          error ? (
            <>
              <h2 style={{ fontSize: 40 }}>{error}</h2>
              <p className="description" style={{ color: "red" }}>
                Redirecting in a few seconds
              </p>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: 60 }}>Please Wait</h2>
              <p className="email-msg">
                {posting
                  ? "Creating post on Linkedin"
                  : "You are being authorized"}
              </p>
              <p className="description" style={{ color: "red" }}>
                Redirecting in a few seconds
              </p>
            </>
          )
        ) : (
          <h2 style={{ fontSize: 60 }}>Unauthorized Access</h2>
        )}
      </div>
    </div>
  );
};

export default LinkedInVerification;
