import React from "react";
import { FaCheck } from "react-icons/fa";

export const MonthlyStarter = ({ handlePayment, cancel, email }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 ">
      <div
        className="card p-3"
        style={{
          textAlign: "left",
        }}
      >
        <h4>Starter Package</h4>
        <p style={{ color: "#6B7280" }}>To help you grow</p>
        {!cancel ? (
          <>
            <h2>
              $49 <span style={{ color: "#6B7280" }}>/mo</span>
            </h2>
            <p style={{ color: "#6B7280" }}>
              $39 / month if you sign up for a year
            </p>{" "}
          </>
        ) : null}
        {cancel ? (
          <button
            className="btn btn-danger plan"
            onClick={() => handlePayment()}
          >
            Cancel Plan
          </button>
        ) : (
          <button
            className="btn btn-primary plan"
            onClick={() =>
              handlePayment(
                `https://buy.stripe.com/test_9AQaGEbqJ08Z2ze9AA?prefilled_email=${email}`
              )
            }
          >
            Choose Plan
          </button>
        )}
        {!cancel ? (
          <>
            <hr />
            <div className="card-body">
              <h5>What's included</h5>
              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p
                  style={{ margin: "0", color: "#6B7280", fontWeight: "bold" }}
                >
                  12 posts / month
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Instant, well-formatted LinkedIn content in your desired tone
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Generate and save posts for later
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>No emojis</p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  No bulky paragraphs
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  No complicated Ai wording
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Skimmable formatting
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export const YearlyStarter = ({ handlePayment, cancel }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 ">
      <div
        className="card p-3"
        style={{
          textAlign: "left",
        }}
      >
        <h4>Starter Package</h4>
        <p style={{ color: "#6B7280" }}>To help you grow</p>
        {!cancel ? (
          <h2>
            $468 <span style={{ color: "#6B7280" }}>/year</span>
            <span
              style={{
                color: "#d40000",
                marginLeft: 20,
                textDecoration: "line-through",
              }}
            >
              $588
            </span>
          </h2>
        ) : null}

        {!cancel ? (
          <button
            onClick={() => handlePayment()}
            className="btn btn-primary plan"
          >
            Choose Plan
          </button>
        ) : (
          <button
            onClick={() => handlePayment()}
            className="btn btn-danger plan"
          >
            Cancel Plan
          </button>
        )}
        {!cancel ? (
          <>
            <hr />
            <div className="card-body">
              <h5>What's included</h5>
              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p
                  style={{ margin: "0", color: "#6B7280", fontWeight: "bold" }}
                >
                  144 posts / year
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Instant, well-formatted LinkedIn content in your desired tone
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Generate and save posts for later
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>No emojis</p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  No bulky paragraphs
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  No complicated Ai wording
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Skimmable formatting
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export const MonthlyPro = ({ handlePayment, cancel }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 ">
      <div
        className="card  p-3"
        style={{
          textAlign: "left",
        }}
      >
        <h4>Pro Package</h4>
        <p style={{ color: "#6B7280" }}>To help you grow</p>
        {!cancel ? (
          <>
            <h2>
              $99 <span style={{ color: "#6B7280" }}>/mo</span>
            </h2>

            <p style={{ color: "#6B7280" }}>
              $88 / month if you sign up for a year
            </p>
          </>
        ) : null}

        {!cancel ? (
          <button
            onClick={() => handlePayment()}
            className="btn btn-primary plan"
          >
            Choose Plan
          </button>
        ) : (
          <button
            onClick={() => handlePayment()}
            className="btn btn-danger plan"
          >
            Cancel Plan
          </button>
        )}
        {!cancel ? (
          <>
            <hr />
            <div className="card-body">
              <h5>What's included</h5>
              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p
                  style={{ margin: "0", color: "#6B7280", fontWeight: "bold" }}
                >
                  Unlimited posts / month
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Instant, well-formatted LinkedIn content in your desired tone
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Generate and save posts for later
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>No emojis</p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  No bulky paragraphs
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  No complicated Ai wording
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Skimmable formatting
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export const YearlyPro = ({ handlePayment, cancel }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 ">
      <div
        className="card p-3"
        style={{
          textAlign: "left",
        }}
      >
        <h4>Pro Package</h4>
        <p style={{ color: "#6B7280" }}>To help you grow</p>
        {!cancel ? (
          <h2>
            $1056 <span style={{ color: "#6B7280" }}>/year</span>
            <span
              style={{
                color: "#d40000",
                marginLeft: 20,
                textDecoration: "line-through",
              }}
            >
              $1188
            </span>
          </h2>
        ) : null}
        {!cancel ? (
          <button
            className="btn btn-primary plan"
            onClick={() =>
              handlePayment("https://buy.stripe.com/28og0v28dfyo11efYZ")
            }
          >
            Choose Plan
          </button>
        ) : (
          <button
            className="btn btn-danger plan"
            onClick={() => handlePayment()}
          >
            Cancel Plan
          </button>
        )}
        {!cancel ? (
          <>
            <hr />
            <div className="card-body">
              <h5>What's included</h5>
              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p
                  style={{ margin: "0", color: "#6B7280", fontWeight: "bold" }}
                >
                  Unlimited posts / Year
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Instant, well-formatted LinkedIn content in your desired tone
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Generate and save posts for later
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>No emojis</p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  No bulky paragraphs
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  No complicated Ai wording
                </p>
              </div>

              <div
                className="CheckSection"
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <span>
                  <FaCheck className="check" size={20} />
                </span>
                <p style={{ margin: "0", color: "#6B7280" }}>
                  Skimmable formatting
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export const UpgradePlan = ({ handleUpgrade }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 ">
      <div
        className="card p-3"
        style={{
          textAlign: "left",
        }}
      >
        <h4>Upgrade Package</h4>
        <p style={{ color: "#6B7280" }}>To help you grow</p>

        <button className="btn btn-primary plan" onClick={handleUpgrade}>
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};
