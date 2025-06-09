import React from "react";
import UpdateTemplate from "./UpdateTemplate";

function ChangeEmail() {
  const validateEmail = (value) => {
    if (!value) return false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minLength = 5;
    const maxLength = 50; 
    
    return (
      emailPattern.test(value) && 
      value.length >= minLength && 
      value.length <= maxLength
    );
  };

  const rule = [
    {
      required: true,
      message: "Please input your email!",
    },
    {
      type: "email",
      message: "The input is not a valid email!",
    },
    {
      max: 50, // Set maximum length for the email
      message: "Email cannot exceed 50 characters!",
    },
    {
      min: 5, // Set minimum length for the email
      message: "Email must be at least 5 characters!",
    },
  ];
  return (
    <UpdateTemplate
      declareName="email"
      validate={validateEmail}
      field="email"
      formRule={rule}
    />
  );
}

export default ChangeEmail;
