import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { updateUser } from "../../../redux/features/userSlice";

function UpdateTemplate({ declareName, validate, field, formRule }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);
  const [suffix, setSuffix] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const valid = validate(value);

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

  const { closeEditForm } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const handleResetInput = () => {
    form.resetFields();
    setIsValid(false);
    setSuffix(null);
  };

  const handleChange = async (value) => {
    const newAccount = {
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      address: user.address,
      image: user.image,
      [field]: value[field],
    };

    try {
      setLoading(true);
      const reponse = await api.put(`account/${user.id}`, newAccount);
      dispatch(updateUser({ field: field, value: reponse.data[field] }));
      toast.success(`Update ${declareName} successfully!`);
      form.resetFields();
      setSuffix(null);
    } catch (error) {
      toast.error(`Failed to update ${declareName}, try again!`);
    } finally {
      setLoading(false);
    }
  };

  const placeholderText = `Enter new ${field}`;

  return (
    <div>
      <h2>Change your {declareName}</h2>
      <span
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
        }}
      >
        Current {declareName}:
        <strong style={{ marginLeft: "8px" }}>
          <i>{user[field]}</i>
        </strong>
      </span>

      <div style={{ marginTop: "20px" }}>
        <Form form={form} onFinish={handleChange}>
          <Form.Item name={field} rules={formRule}>
            <Input
              style={{ fontSize: 18 }}
              placeholder={placeholderText}
              onChange={handleInputChange}
              suffix={suffix}
            />
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

export default UpdateTemplate;
