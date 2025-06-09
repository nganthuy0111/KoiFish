import React from "react";
import UpdateTemplate from "./UpdateTemplate";

function ChangePhone() {
  const validatePhone = (value) => {
    if (!value) return false; 
    const phonePattern = /^(0[3-9]\d{8})$/;
    return phonePattern.test(value);
  };

  const rule = [
    {
      required: true,
      message: "Please input your phone number!",
    },
    {
      pattern: /^(0[3-9]\d{8})$/,
      message: "The input is not a valid Vietnamese phone number!",
    },
  ];
  return (
    <UpdateTemplate
      declareName="phone"
      validate={validatePhone}
      field="phone"
      formRule={rule}
    />
  );
}

export default ChangePhone;
