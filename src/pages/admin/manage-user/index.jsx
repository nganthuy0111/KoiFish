import { Table, Avatar, Button, Modal, Form, Input, Select, message } from "antd";
import { UserOutlined, PlusCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../../../config/axios";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [form] = Form.useForm();

  // Fetch user data from the API
  const fetchUsers = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await api.get(`/account?page=${page - 1}&size=${pageSize}`);
      setUsers(response.data.listData || response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.data.totalElements || response.data.length,
      }));
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  // Handle table change for pagination
  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  // Handle adding a new user
  const handleAddUser = async (values) => {
    try {
      setLoading(true);
      const response = await api.post("/register", values);
      message.success("User added successfully!");
      fetchUsers(pagination.current, pagination.pageSize); // Refresh user list
      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      console.error("Error adding user:", err);
      message.error(err.response?.data?.message || "Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Avatar",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Avatar
          src={image}
          icon={!image && <UserOutlined />}
          alt="User Image"
        />
      ),
    },
  ];

  return (
    <div>
      <h2>User Management</h2>
      <Button
        type="primary"
        icon={<PlusCircleFilled />}
        style={{
          marginBottom: "20px",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Add User
      </Button>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showTotal: (total) => `Total ${total} users`,
        }}
        onChange={handleTableChange}
      />
      <Modal
        title="Add New User"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input the phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name=""
            dependencies={['password']} 
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input the full name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select the role!" }]}
          >
            <Select>
              <Select.Option value="SALE">SALE</Select.Option>
              <Select.Option value="ADMIN">CONSULTING</Select.Option>
              <Select.Option value="ADMIN">MANAGER</Select.Option>
              <Select.Option value="USER">USER</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserManagement;
