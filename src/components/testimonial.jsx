import React from "react";
import "../style/testimonials.css";
import { Rating } from "@mui/material";

const TestimonialComponent = ({ item }) => {
  const imageURI = `${process.env.REACT_APP_BASE_URL}/api/images/${item.filePath}`;
  return (
    <div className="testiContainer">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={imageURI} alt="img" className="rounded-image" />

        <h6>
          {item.name},{" "}
          <span style={{ color: "#150261" }}>{item.designation}</span>
        </h6>
      </div>
      <p>"{item.review}"</p>

      <Rating
        name="read-only"
        value={5}
        readOnly
        size="large"
        style={{ position: "absolute", bottom: 15, marginLeft: 45 }}
      />
    </div>
  );
};

export default TestimonialComponent;
