import { Button } from "antd";
import React from "react";
import { ImSad } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import "./CBPaymentFailed.scss";

function CBPaymentFailed() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="bpf-container">
        <div className="bpf-failed-icon">
          <ImSad />
        </div>

        <div className="bpf-title">
          <h1>Payment Failed!</h1>
        </div>

        <div className="bpf-notify">
          <span>
            Sorry, we are not able to process your payment at the moment.
          </span>
          <br />
          <span>Let try again.</span>
        </div>

        <div className="bpf-button-handle">
          <Button onClick={() => navigate("/")}>Back to home</Button>
        </div>
      </div>
    </div>
  );
}

export default CBPaymentFailed;
