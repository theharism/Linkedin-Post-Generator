import React from "react";
import { Button, Col } from "react-bootstrap";

const ShowUpgrade = ({ onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal when clicking on the overlay
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="containerForm ">
          <div
            style={{
              height: 500,
              width: 800,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={require("../images/preview.jpg")}
              alt="linkedin preview"
              style={{
                height: 395,
                width: 800,
                aspectRatio: 1,
              }}
            />
            <Button
              onClick={onClose}
              style={{ margin: 10, backgroundColor: "#150261" }}
            >
              Try now with Pro Subscription
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowUpgrade;
