import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ReportIcon from "@mui/icons-material/Report";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Referral = () => {
  const { email, username } = useSelector((state) => state.User);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [verification, setVerification] = useState(false);

  async function getReferral() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/referral/retreive/${username}`
      );

      setReferralCode(response.data.referralCode);
      setVerification(response.data.verification);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getReferral();
  }, []);

  const generateReferralCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/referral/create`,
        { email, username }
      );
      setReferralCode(response.data.referralCode);
    } catch (error) {
      toast.error("An Unexpected Error occurred", {
        position: "top-right",
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  const completeVerification = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/api/referral/verification-link/create/${username}`;
  };

  return (
    <Container className="PostGenContaier">
      <div className="container">
        <div className="heading">
          <h1 className="bold-text">Muse Referral Program</h1>
          <p>
            The Muse referral program enables your friends and family to access
            Muse <br /> at a reduced price, granting you the equivalent discount
            amount.
          </p>
        </div>
        <br />
        <br />
        {referralCode ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h4>Referral Code:</h4>
              &nbsp;&nbsp;
              <p style={{ color: "blue" }}>
                {verification ? referralCode : "***************"}
              </p>
            </div>

            {verification ? null : (
              <>
                <ReportIcon sx={{ color: "#f5cc00" }} fontSize="large" />

                <p style={{ color: "red", fontSize: 16 }}>
                  Verification Incomplete. You cannot get referral program
                  incentives until you are verified
                </p>

                <Button onClick={completeVerification} variant="primary">
                  Complete Verification
                </Button>
              </>
            )}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h4>Referral Code:</h4>
            &nbsp;&nbsp;
            {loading ? (
              <ClipLoader color={"#123abc"} loading={loading} size={25} />
            ) : (
              <Button
                onClick={generateReferralCode}
                variant="primary"
                className="submit w-60"
              >
                Generate Referral Code
                <ClipLoader color="white" loading={loading} size={25} />
              </Button>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Referral;
