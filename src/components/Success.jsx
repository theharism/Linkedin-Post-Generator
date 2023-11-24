import React, { useState, useEffect } from "react";
import "../style/Success.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSubscription } from "../slices/SubscriptionSlice";
import { addPoints, setPoints } from "../slices/PointsSlice";

const Success = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();
  const email = useSelector((state) => state.User.email);
  const fullName = useSelector((state) => state.User.fullName);

  useEffect(() => {
    if (sessionId != null) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/success`, {
          params: {
            session_id: sessionId,
            email,
          },
        })
        .then(async (response) => {
          setStatus(true);
          const points = response.data.points;
          const subscription = {
            id: response.data.id,
            createdDate: response.data.createdDate,
            expiresDate: response.data.expiresDate,
            type: response.data.type,
          };

          dispatch(setSubscription({ subscription }));
          dispatch(setPoints({ points }));

          if (subscription.type === "Starter")
            await axios.post(
              `${process.env.REACT_APP_BASE_URL}/api/useremail`,
              {
                fullName: fullName,
                email: email,
                type: "paid", // new user
              }
            );
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("Your payment cannot be verified. Try again later");
        });
    } else {
      setError("Your payment cannot be verified. Try again later");
    }
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        {error && (
          <>
            <h3>{error}</h3>

            <p className="description">
              If you have any questions, please email
              <a className="email" href="mailto:Josh@muse-tool.com">
                Josh@muse-tool.com
              </a>
            </p>
          </>
        )}

        {status ? (
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

export default Success;
