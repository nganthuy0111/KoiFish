import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { updateUser } from "../../../redux/features/userSlice";

function ChangeFullName() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);
  const [suffix, setSuffix] = useState(null);
  const validateFullName = (value) => {
    if (!value) return false;
    if (value.length > 30) return false;
    if (value.length < 3) return false;
    if (!/^[\p{L}\s]+$/u.test(value)) return false;
    return true; // valid
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const valid = validateFullName(value);

    setIsValid(valid);
    setSuffix(
      isValid ? (
        <CheckCircleOutlined style={{ color: "green" }} />
      ) : (
        <IoClose
          onClick={handleResetInput}
          style={{ color: "gray", cursor: "pointer", fontSize: 20 }}
        />
      )
    );
  };

  const { closeEditForm} = useOutletContext();
  const [loading, setLoading] = useState(false);
  const handleResetInput = () => {
    form.resetFields();
    setIsValid(false);
    setSuffix(null);
  };

  const handleChangeName = async (value) => {
    const newAccount = {
      email: user.email,
      phone: user.phone,
      fullName: value.fullName,
      address: user.address,
      image: user.image,
    };

    try {
      setLoading(true);
      const reponse = await api.put(`account/${user.id}`, newAccount);
      dispatch(updateUser({ field: "fullName", value: reponse.data.fullName }));
      toast.success("Change new name successfully!");
      form.resetFields();
      setSuffix(null);
    } catch (error) {
      toast.error("Failed to change your name!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Change your name</h2>
      <span>
        Current name:
        <strong style={{ marginLeft: "8px" }}>
          <i>{user.fullName}</i>
        </strong>
      </span>

      <div style={{ marginTop: "20px" }}>
        <Form form={form} onFinish={handleChangeName}>
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
              {
                min: 3,
                message: "Full name must be at least 3 characters",
              },
              {
                max: 30,
                message: "Full name must be at most 30 characters!",
              },
              {
                pattern: /^[\p{L}\s]+$/u,
                message:
                  "Full name cannot contain numbers or special characters!",
              },
            ]}
          >
            <Input
              style={{ fontSize: 18 }}
              placeholder="Enter new full name"
              onChange={handleInputChange}
              suffix={suffix}
            />
          </Form.Item>
          <Flex justify="flex-end">
            <Space>
              <Button
                style={{ backgroundColor: "#33b249", color: "antiquewhite" }}
                htmlType="submit"
                loading= {loading}
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

export default ChangeFullName;
