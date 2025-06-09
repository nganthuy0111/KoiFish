import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import api from "../../config/axios";
import "./NewPassword.css";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();                                                                 
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const oobCode = searchParams.get("oobCode");

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/reset-password", {
        token: oobCode,
        password: password,
      });

      message.success(
        response.data.message || "Password has been successfully reset!"
      );

      navigate("/login");
    } catch (error) {
      if (error.response) {
        message.error(
          error.response.data.message ||
            "An error occurred during password reset."
        );
      } else {
        message.error("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-password-container">
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Reset Your Password
      </h2>
      <Form onFinish={handleResetPassword}>
        <Form.Item
          label="New Password"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          rules={[
            { required: true, message: "Please confirm your new password" },
          ]}
        >
          <Input.Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Set New Password
        </Button>
      </Form>
    </div>
  );
};

export default NewPassword;
