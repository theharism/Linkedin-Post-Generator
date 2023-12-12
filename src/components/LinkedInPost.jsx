import React from "react";
import "../style/LinkedInPost.css";
import { useSelector } from "react-redux";
export default function LinkedInPost({ message }) {
  const fullName = useSelector((state) => state.User.fullName);

  if (message.length < 1) {
    return;
  }

  const lineCount = message.split("\n").length;

  return (
    <div className="border">
      <div className="info">
        <div className="subInfo">
          <img
            src={require("../images/M.png")}
            alt="img"
            className="rounded-image"
          />

          <div className="text">
            <p style={{ fontFamily: "inter", fontSize: 14, color: "black" }}>
              <strong>{fullName}</strong>
            </p>
            <p
              style={{
                fontFamily: "inter",
                fontSize: "12px",
                color: "#6B7280",
                fontWeight: "lighter",
              }}
            >
              MUSING
            </p>
            <p
              style={{
                fontFamily: "inter",
                fontSize: "12px",
                color: "#6B7280",
              }}
            >
              1h
            </p>
          </div>
        </div>

        <i
          className="bi bi-three-dots"
          style={{ fontSize: 25, color: "gray" }}
        ></i>
      </div>
      <div className="textarea">
        <p style={{ fontFamily: "inter", margin: 0, color: "black" }}>
          {message}
        </p>
      </div>
      {lineCount <= 2 && <br />}
      <div className="icons">
        <div
          style={{
            fontFamily: "inter",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <i className="bi bi-hand-thumbs-up p-1"></i>Like
        </div>
        <div
          style={{
            fontFamily: "inter",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <i className="bi bi-chat-dots p-1"></i>Comment
        </div>
        <div
          style={{
            fontFamily: "inter",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <i className="bi bi-share p-1"></i>Repost
        </div>
        <div
          style={{
            fontFamily: "inter",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <i className="bi bi-send p-1"></i>Share
        </div>
      </div>
    </div>
  );
}
