import axios from "axios";
import React, { useEffect, useState } from "react";
import TestimonialComponent from "../components/testimonial";
import "../style/testimonials.css";

const Testimonials = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllTestimonials = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/testimonials`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        throw error;
      }
    };

    getAllTestimonials();
  }, []);

  return (
    <>
      <div className="testimonialsContent">
        <br />
        <br />
        <h4>Testimonials</h4>
        <br />
      </div>
      <div className="testimonialsContainer">
        <div className="slide">
          {data.map((item) => {
            return <TestimonialComponent item={item} />;
          })}
        </div>
        <div className="slide">
          {data.map((item) => {
            return <TestimonialComponent item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
