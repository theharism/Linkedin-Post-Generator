import React from "react";
import "../style/UseCases.css";
import { Col, Row } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { usecases } from "../constants/UseCases";

const UseCases = () => {
  const UseCaseContent = ({ item, index }) => {
    return (
      <div className="useCasesMainContent">
        <Row>
          {index % 2 !== 0 ? (
            <Row>
              <Col>
                <img src={item.src} alt={item.alt} className="image" />
              </Col>
              <Col>
                <h4>{item.heading}</h4>
                <p>{item.content}</p>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <h4>{item.heading}</h4>
                <p>{item.content}</p>
              </Col>
              <Col>
                <img src={item.src} alt={item.alt} className="image" />
              </Col>
            </Row>
          )}
        </Row>
        <br />
        <br />
        <ScrollLink
          to="hero"
          spy={true}
          smooth={true}
          duration={80}
          offset={30}
          style={{ textDecoration: "none", color: "white" }}
          className="FormLinks"
        >
          <button className="button buttonColorIn">Try it out</button>
        </ScrollLink>
      </div>
    );
  };

  return (
    <>
      <div className="useCases">
        <div className="useCasesContent">
          <br />
          <br />
          <p>Use Cases</p>
          <h4>
            Created by ghostwriters, for Linkedin Users, to make Linkedin
            content creation easier
          </h4>
          <br />
          <br />
          <ScrollLink
            to="hero"
            spy={true}
            smooth={true}
            duration={80}
            offset={30}
            style={{ textDecoration: "none", color: "white" }}
            className="FormLinks"
          >
            <button className="button buttonColorOut">Get Started</button>
          </ScrollLink>
          <br />
          <br />
        </div>
      </div>
      <div className="useCasesContent mainContentColor">
        {usecases.map((item, index) => (
          <UseCaseContent item={item} index={index} />
        ))}
      </div>

      <div className="useCasesContent">
        <h4>Ready to Simplify your Linkedin content creation?</h4>
        <br />
        <ScrollLink
          to="hero"
          spy={true}
          smooth={true}
          duration={80}
          offset={30}
          style={{ textDecoration: "none", color: "white" }}
          className="FormLinks"
        >
          <button className="button buttonColorOut">Get Started</button>
        </ScrollLink>
        <br /> <br />
      </div>
    </>
  );
};

export default UseCases;
