import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import "../style/HeroSection.css";
import Logo from "../images/FinalLogo.png";
import GeneratePost from "../components/GeneratePost";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ModalPopup from "../components/ModalPopup";
import { addMember } from "../slices/TeamsSlice";

const HeroSection = () => {
  const location = useLocation();
  const [teamId, setTeamId] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const teamId = searchParams.get("teamId");
    const email = searchParams.get("email");
    setEmail(email);
    setTeamId(teamId);
  }, [location.search]);

  const handleJoinTeam = () => {
    dispatch(addMember({ id: teamId, emails: [email], setTeamId }));
    navigate("/");
  };

  return (
    <div className="Container">
      <div className="Section">
        <div className="HeroLogo">
          <img src={Logo} alt="logo" className="HeroInsideLogo" />
        </div>
        <h4>
          Create hyper-personalized content using Muse, the #1 LinkedIn content
          writing tool
        </h4>

        <div>
          <div
            className="CheckSection"
            style={{ display: "flex", alignItems: "baseline" }}
          >
            <span>
              <FaCheck className="check" size={20} />
            </span>
            <p style={{ margin: "0" }}> Your voice</p>
          </div>
          <div
            className="CheckSection"
            style={{ display: "flex", alignItems: "baseline" }}
          >
            <span>
              <FaCheck className="check" size={20} />
            </span>
            <p style={{ margin: "0" }}>
              {" "}
              Non-robotic / Non-Ai sounding content
            </p>
          </div>
          <div
            className="CheckSection"
            style={{ display: "flex", alignItems: "baseline" }}
          >
            <span>
              <FaCheck className="check" size={20} />
            </span>
            <p style={{ margin: "0" }}>
              {" "}
              Create months worth of content in minutes
            </p>
          </div>
        </div>
      </div>
      {teamId && (
        <ModalPopup state={true} onClose={handleJoinTeam} overlay={true} />
      )}
      <GeneratePost />
    </div>
  );
};

export default HeroSection;
