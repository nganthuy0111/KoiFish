import { Button, Form, Input, Modal, Space, Typography } from "antd";
import { auth, googleProvider } from "../../config/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ResetPasswordModal from "../../components/reset-password/ResetPasswordModal.jsx";
import api from "../../config/axios.js";
import "./login.css";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice.js";

const { Title } = Typography;

function LoginPage({ showRegisForm, closeLoginForm }) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGG, setLoadingGG] = useState(false);

  const dispatch = useDispatch();

  // const handleLoginGoogle = async () => {
  //   setLoadingGG(true);
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     const user = result.user;

  //     const apiResponse = await api.post("loginGoogle", {
  //       token,
  //     });

  //     dispatch(login(apiResponse.data));
  //     localStorage.setItem("token", apiResponse.data.token);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Login failed");
  //   } finally {
  //     setLoadingGG(false);
  //   }
  // };

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await api.post("login", values);
      console.log(response.data);

      dispatch(login(response.data));
      localStorage.setItem("token", response.data.token);

      if (response.data.role === "ADMIN") {
        console.log("Match condition");
        navigate("/dashboard");
        toast.success("Login success");
        closeLoginForm();
      } else if (response.data.role === "SALE") {
        navigate("/dashboardSale");
        toast.success("Login success");
        closeLoginForm();
      } else if (response.data.role === "MANAGER") {
        navigate("/dashboardManager");
        toast.success("Login success");
        closeLoginForm();
      } else if (response.data.role === "CONSULTING") {
        navigate("/consulting");
        toast.success("Login success");
        closeLoginForm();
      } else if (response.data.role === "CUSTOMER") {
        navigate("/");
        toast.success("Login success");
        closeLoginForm();
      }
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="loginWrapper">
      <Title level={2} className="login-title">
        Login
      </Title>
      <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <div className="forgotPassword">
          <Button
            type="link"
            onClick={showModal}
            className="forgot-password-link"
          >
            Forgot Password?
          </Button>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
            style={{ backgroundColor: "#ff8a33" }}
          >
            {loading ? <LoadingOutlined /> : "Login"}
          </Button>
          {/* <h4 className="or-text">or</h4> */}
        </Form.Item>
        {/* <Form.Item>
          <Button
            danger
            htmlType="button"
            onClick={handleLoginGoogle}
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loadingGG ? <LoadingOutlined /> : "Login with Google"} Login with
            Google <img src="/image/logoGG.png" alt="ggLogo" width={20} />
          </Button>
        </Form.Item> */}
      </Form>

      <div className="signUp">
        <Space>
          <span>Don't have an account?</span>
          <span className="signup-link" onClick={showRegisForm}>
            Sign Up
          </span>
        </Space>
      </div>
      <Modal
        title="Forgot Password"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <ResetPasswordModal onClose={handleCancel} />
      </Modal>
    </div>
  );
}

export default LoginPage;
