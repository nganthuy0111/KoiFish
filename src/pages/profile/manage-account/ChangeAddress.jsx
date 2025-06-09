import React from "react";
import UpdateTemplate from "./UpdateTemplate";

function ChangeAddress() {
  const validateAddress = (value) => {
    if (!value) return false; 
    const addressPattern = /^[a-zA-Z0-9\s,.'-]{10,}$/;

    const maxLength = 100;
    return addressPattern.test(value) && value.length <= maxLength;
  };

  const rule = [
    {
      required: true,
      message: "Please input your address!",
    },
    {
      min: 10,
      message: "The address must be at least 10 characters long!",
    },

    {
      max: 100,
      message: "The address must be at most 100 characters long.",
    },
  ];

  return (
    <UpdateTemplate
      declareName="address"
      validate={validateAddress}
      field="address"
      formRule={rule}
    />
  );
}

export default ChangeAddress;
