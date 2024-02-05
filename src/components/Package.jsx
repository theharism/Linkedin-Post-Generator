import React from "react";
import { FaCheck } from "react-icons/fa";

const Property = ({ text, isBold, isNew }) => (
  <div
    className="CheckSection"
    style={{ display: "flex", alignItems: "baseline" }}
  >
    <span>
      <FaCheck className="check" size={20} />
    </span>
    <p
      style={{
        margin: "0",
        color: "#6B7280",
        fontWeight: isBold && "bold",
        position: "relative",
      }}
    >
      {text}&nbsp;
      {isNew && (
        <span
          style={{
            color: "red",
            top: 0,
            fontSize: 12,
            position: "absolute",
          }}
        >
          New
        </span>
      )}
    </p>
  </div>
);

const StarterProperties = () => (
  <>
    <Property
      text={"Instant, well-formatted LinkedIn content in your desired tone"}
    />
    <Property text={"Generate and save posts for later"} />
    <Property text={"No emojis"} />
    <Property text={"No bulky paragraphs"} />
    <Property text={"No complicated Ai wording"} />
    <Property text={"Skimmable formatting"} />
  </>
);

const ProProperties = () => (
  <>
    <Property text={"LinkedIn Post Preview"} isBold={true} isNew={true} />
    <Property
      text={"Share post directly to LinkedIn"}
      isBold={true}
      isNew={true}
    />
    <Property text={"Post optimization"} isBold={true} isNew={true} />
    <Property
      text={"Instant, well-formatted LinkedIn content in your desired tone"}
    />
    <Property text={"Generate and save posts for later"} />
    <Property text={"No emojis"} />
    <Property text={"No bulky paragraphs"} />
    <Property text={"No complicated Ai wording"} />
    <Property text={"Skimmable formatting"} />
  </>
);

export const YearlyPackage = ({
  title,
  fullPrice,
  discountedPrice,
  handlePayment,
  isStarter,
}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 ">
      <div
        className="card p-3"
        style={{
          textAlign: "left",
        }}
      >
        <h4>{title}</h4>
        <p style={{ color: "#6B7280" }}>To help you grow</p>
        <h2>
          {fullPrice}
          <span style={{ color: "#6B7280" }}>/year</span>

          <span
            style={{
              color: "#d40000",
              marginLeft: 20,
              textDecoration: "line-through",
            }}
          >
            {discountedPrice}
          </span>
        </h2>

        <button className="btn btn-primary plan" onClick={handlePayment}>
          Choose Plan
        </button>

        <hr />
        <div className="card-body">
          <h5>What's included</h5>

          {isStarter ? (
            <>
              <Property text={"144 posts / year"} isBold={true} />
              <StarterProperties />
            </>
          ) : (
            <>
              <Property text={"Unlimited posts / year"} isBold={true} />
              <ProProperties />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const MonthlyPackage = ({
  title,
  fullPrice,
  discountedPrice,
  handlePayment,
  isStarter,
}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 ">
      <div
        className="card p-3"
        style={{
          textAlign: "left",
        }}
      >
        <h4>{title}</h4>
        <p style={{ color: "#6B7280" }}>To help you grow</p>
        <h2>
          {fullPrice}
          <span style={{ color: "#6B7280" }}>/mo</span>
        </h2>

        <p style={{ color: "#6B7280" }}>
          {discountedPrice}/ month if you sign up for a year
        </p>

        <button className="btn btn-primary plan" onClick={handlePayment}>
          Choose Plan
        </button>

        <hr />
        <div className="card-body">
          <h5>What's included</h5>

          {isStarter ? (
            <>
              <Property text={"12 posts / month"} isBold={true} />
              <StarterProperties />
            </>
          ) : (
            <>
              <Property text={"Unlimited posts / month"} isBold={true} />
              <ProProperties />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const CustomizePlan = ({ title, type, onClick }) => (
  <div className="col-12 col-md-6 col-lg-5 ">
    <div
      className="card p-3"
      style={{
        textAlign: "left",
      }}
    >
      <h4>{title} Package</h4>
      <p style={{ color: "#6B7280" }}>To help you grow</p>

      <button
        className={`btn btn-${type === 1 ? "primary" : "danger"} plan`}
        onClick={onClick}
      >
        {type === 2 ? "Cancel" : title} Plan
      </button>
    </div>
  </div>
);
