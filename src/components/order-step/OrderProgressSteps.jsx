// src/components/OrderProgressSteps.js
import React from "react";
import { Steps } from "antd";

const OrderProgressSteps = ({ status }) => {
  const getCurrentStepIndex = () => {
    switch (status) {
      case "PENDING":
        return 0;
        case "UPDATED":
            return 1;
      case "CONFIRM":
        return 2;
      case "DELIVERING":
        return 3;
      case "DONE":
        return 4;
      default:
        return 0;
    }
  };

  return (
    <Steps size="small" current={getCurrentStepIndex()}>
      <Steps.Step
        title="Pending"
        status={status === "PENDING" ? "process" : "wait"}
        icon={<span style={{ color: status === "PENDING" ? "green" : "gray" }}>●</span>}
      />
       <Steps.Step
        title="Updated"
        status={status === "UPDATED" ? "process" : "wait"}
        icon={<span style={{ color: status === "UPDATED" ? "green" : "gray" }}>●</span>}
      />
      <Steps.Step
        title="Confirm"
        status={status === "CONFIRM" ? "process" : "wait"}
        icon={<span style={{ color: status === "CONFIRM" ? "green" : "gray" }}>●</span>}
      />
      <Steps.Step
        title="Delivering"
        status={status === "DELIVERING" ? "process" : "wait"}
        icon={<span style={{ color: status === "DELIVERING" ? "green" : "gray" }}>●</span>}
      />
      <Steps.Step
        title="Done"
        status={status === "DONE" ? "finish" : "wait"}
        icon={<span style={{ color: status === "DONE" ? "green" : "gray" }}>●</span>}
      />
    </Steps>
  );
};

export default OrderProgressSteps;
