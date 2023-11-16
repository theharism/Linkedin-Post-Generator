import React, { useState, useEffect } from "react";
import "../style/Success.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const EmailVerified = () => {
  const email = useSelector((state) => state.User.email);
  const fullName = useSelector((state) => state.User.fullName);

  return (
    <div className="success-wrapper">
      <div className="success">
        {email && fullName ? (
          <>
            <h2>Thank you for subscribing</h2>
            <p className="email-msg">Check your email inbox for the receipt.</p>
            <p className="description">
              If you have any questions, please email
              <a className="email" href="mailto:order@example.com">
                Josh@muse-tool.com
              </a>
            </p>
            <Link to="/post">
              <button type="button" width="300px" className="btnSuccess">
                Start Musing
              </button>
            </Link>
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default EmailVerified;
