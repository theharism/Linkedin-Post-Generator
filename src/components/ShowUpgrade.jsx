import React from "react";
import { Button } from "react-bootstrap";

const ShowUpgrade = ({ onClose, type }) => {
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
              width: 1200,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <img
              src={
                type === 1
                  ? require("../images/preview.jpg")
                  : require("../images/optimize.png")
              }
              alt="linkedin preview"
              style={{
                maxHeight: 342,
                width: "100%",
                aspectRatio: 1,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
                borderRadius: 8, // Optional: Add borderRadius for a rounded appearance
                zIndex: 1, // Optional: Adjust zIndex if needed
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
