import React from "react";
import "../style/testimonials.css";

const TestimonialComponent = ({ item }) => {
  return (
    <div className="testiContainer">
      <h5>
        {item.name},{" "}
        <span style={{ color: "#150261" }}>{item.designation}</span>
      </h5>

      <p>"{item.review}"</p>
    </div>
  );
};

export default TestimonialComponent;
