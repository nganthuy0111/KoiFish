import { Button, Flex, Form, Input, Space } from "antd";
import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const { closeEditForm } = useOutletContext();
  const [form] = Form.useForm();

  const handleSubmitPassword = async (values) => {
    try {
      const response = await api.post("change-password", values);
      if (response.data === "Successfully change your password!") {
        toast.success(response.data);
      }

      if (response.data === "Invalid current password!") {
        toast.error(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2>Change your password</h2>

      <div>
        <Form form={form} onFinish={handleSubmitPassword}>
          <Form.Item
            name="currentPassword"
            rules={[
              { required: true, message: "Current password is required" },
            ]}
          >
            <Input.Password placeholder="Enter your current password" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "New password is required" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Flex justify="flex-end">
            <Space>
              <Button
                style={{ backgroundColor: "#33b249", color: "antiquewhite" }}
                htmlType="submit"
                loading={loading}
              >
                Save
              </Button>
              <Button
                style={{ backgroundColor: "#ED0800", color: "antiquewhite" }}
                onClick={closeEditForm}
              >
                <Link to="">Close</Link>
              </Button>
            </Space>
          </Flex>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
