import React from "react";
import "../style/UseCases.css";
import { Col, Row } from "react-bootstrap";

import { usecases } from "../constants/UseCases";

const UseCases = () => {
  const UseCaseContent = ({ item, index }) => {
    return (
      <div className="useCasesMainContent">
        <Row>
          {index % 2 !== 0 ? (
            <Row className="Row">
              <Col>
                <img src={item.src} alt={item.alt} className="image" />
              </Col>
              <Col>
                <h4>{item.heading}</h4>
                <p>{item.content}</p>
              </Col>
            </Row>
          ) : (
            <Row className="Row">
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
        <button className="button buttonColorIn">Try it out</button>
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
          <button className="button buttonColorOut">Get Started</button>
          <br />
          <br />
        </div>
      </div>
      <div className="useCasesContent mainContentColor">
        {usecases.map((item, index) => (
          <UseCaseContent item={item} index={index} />
        ))}
      </div>
      <div className="useCases">
        <div className="useCasesContent">
          <h4>Ready to Simplify your Linkedin content creation?</h4>
          <br />
          <button className="button buttonColorOut">Get Started</button>

          <br />
        </div>
      </div>
    </>
  );
};

export default UseCases;
