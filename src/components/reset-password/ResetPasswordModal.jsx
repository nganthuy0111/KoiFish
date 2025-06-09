import { Form, Input, Button, message, Modal } from "antd";
import { useState } from "react";
import "./ResetPasswordModal.css"; // Import file CSS
import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import api from "../../config/axios"; 
import { toast } from "react-toastify";

const ResetPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await api.post("/forgot-password", { email });
      setIsEmailSent(true);
      toast.success(response.data.message || "Reset link sent!");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("Network error, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await api.post("/forgot-password", { email });
      toast.success("Reset link resent successfully!");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to resend email.");
      } else {
        toast.error("Network error, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setIsEmailSent(false);
    onClose();
  };

  return (
    <>
      <div className="forgot-password-modal">
        <div className="icon-container">
          <KeyOutlined />
        </div>
        <h2>Forgot Password</h2>
        <p className="forgot-password-description">
          No worries, we'll send you reset instructions.
        </p>
        <Form onFinish={handleResetPassword} className="forgot-password-form">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="reset-password-button"
              block
            >
              Reset Password
            </Button>
          </Form.Item>
          <Button type="link" onClick={closeSuccessModal}>
            Back to Login
          </Button>
        </Form>
      </div>

      <Modal
        title="Check your email"
        visible={isEmailSent}
        onCancel={closeSuccessModal}
        footer={null}
        className="email-confirmation-modal"
      >
        <div className="icon-container">
          <MailOutlined />
        </div>
        <p className="forgot-password-description">
          We sent a password reset link to <strong>{email}</strong>.
        </p>
        <Button
          type="primary"
          onClick={() => window.open("https://mail.google.com/mail", "_blank")}
          block
        >
          Open email app
        </Button>
        <p className="resend-text">
          Didn’t receive the email?{" "}
          <Button type="link" onClick={handleResend}>
            Click to resend
          </Button>
        </p>
        <Button type="link" onClick={closeSuccessModal}>
          Back to Login
        </Button>
      </Modal>
    </>
  );
};

export default ResetPasswordModal;
