import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";

const Unauthorized = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Result
        status="403"
        title="403 - Unauthorized Access"
        subTitle="Sorry, you don't have permission to access this page. Please contact the administrator if you need assistance."
        extra={
          <Button type="primary" onClick={goBack}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
};

export default Unauthorized;
