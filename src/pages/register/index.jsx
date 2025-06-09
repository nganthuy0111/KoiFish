// RegisterPage.js
import { useState } from "react";
import { Form, Input, Typography, Checkbox, Flex, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { LoadingOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;

const RegisterPage = ({ showLoginForm, closeForm }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      values.role = "CUSTOMER";
      const response = await api.post("register", values);
      toast.success("Registration successful!");
      form.resetFields();
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title className="title-register">Create Account</Title>
      <Form form={form} name="register" onFinish={handleRegister}>
        <Form.Item
          className="form-items-register"
          name="userName"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Flex>
          <Form.Item
            className="form-items-register"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
            style={{ marginRight: 10 }}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            className="form-items-register"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Confirm password do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
        </Flex>

        <Form.Item
          className="form-items-register"
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          className="form-items-register"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Email is invalid!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          className="form-items-register"
          name="phone"
          validateTrigger={["onBlur", "onChange"]}
          rules={[
            { required: true, message: "Please enter your phone number!" },
            {
              pattern: /^(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Please enter a valid phone number!",
            },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          className="form-items-register"
          name="address"
          rules={[{ required: true, message: "Please enter your address!" }]}
        >
          <TextArea placeholder="Enter your address" />
        </Form.Item>

        <Form.Item
          className="form-items-register"
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Please accept the terms")),
            },
          ]}
        >
          <Checkbox>
            I agree with{" "}
            <span
              onClick={() => {
                navigate("term-privacy");
                closeForm(); // Đóng modal
              }}
              style={{ color: "orange", fontWeight: "bold", cursor: "pointer" }}
            >
              Terms
            </span>{" "}
            and{" "}
            <span
              onClick={() => {
                navigate("term-privacy");
                closeForm(); // Đóng modal
              }}
              style={{ color: "orange", fontWeight: "bold", cursor: "pointer" }}
            >
              Privacy
            </span>{" "}
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#ff8a33",
              borderColor: "#ff8a33",
              width: "100%",
            }}
            type="primary"
            loading={loading}
          >
            {loading ? <LoadingOutlined /> : "Sign Up"}
          </Button>
        </Form.Item>

        <Flex justify="center">
          <span style={{ color: "gray" }}>
            Already have an account?
            <span
              onClick={showLoginForm}
              style={{
                fontWeight: "bold",
                color: "#ff8a33",
                cursor: "pointer",
              }}
            >
              {" "}
              Log in
            </span>
          </span>
        </Flex>
      </Form>
    </>
  );
};

export default RegisterPage;
