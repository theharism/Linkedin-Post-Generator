import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../style/Success.css";
import { useNavigate } from "react-router-dom";
import { LinkedinAuthentication } from "../constants/helper";
import { useSelector } from "react-redux";

const LinkedInVerification = () => {
  const state = localStorage.getItem("state");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const email = useSelector((state) => state.User.email);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const code = urlParams.get("code");
    const queryState = urlParams.get("state");
    const error = urlParams.get("error");
    const errorDescription = urlParams.get("error_description");

    if (state === queryState) {
      setAuthorized(true);
      if (error) {
        setError(errorDescription);
        setTimeout(() => {
          navigate("/");
        }, [3000]);
      } else {
        LinkedinAuthentication(code, email);
      }
    } else {
      setAuthorized(false);
    }
  }, []);

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
              <p className="email-msg">You are being authorized</p>
              <p className="description" style={{ color: "red" }}>
                Redirecting in a few seconds
              </p>
            </>
          )
        ) : (
          <>
            <h2 style={{ fontSize: 80 }}>Unauthorized Access</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default LinkedInVerification;
