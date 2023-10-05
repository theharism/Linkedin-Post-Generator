import React, { useState, useEffect } from "react";
import "../style/Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const handleTryNowClick = () => {
    window.location.reload();
  };
  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // If the user has scrolled down, add the scrolled class
        setScrolled(true);
      } else {
        // If the user is at the top of the page, remove the scrolled class
        setScrolled(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-left">
        <img
          src={process.env.PUBLIC_URL + "/Muse.png"}
          alt="#"
          style={{ height: 75, width: 75 }}
          onClick={handleTryNowClick}
        />
      </div>
      <div className="navbar-right">
        <p style={{ fontSize: "1.2em" }}>Post Generator</p>
      </div>
    </nav>
  );
}

export default Navbar;
