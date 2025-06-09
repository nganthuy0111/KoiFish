import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { Avatar, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
function ViewConsulting() {
  const [datas, setDatas] = useState([]);

  const fetchData = async (page, pageSize) => {
    try {
      const response = await api.get(`account?page=${page}&size=${pageSize}`);
      const allCustomer = response.data.listData; // Adjust based on actual response format
      // Filter out items where deleted is true
      const filteredData = allCustomer.filter(
        (account) => account.role === "CONSULTING"
      );
      setDatas(filteredData);
    } catch (err) {
      toast.error(err.response?.data || "Error fetching data");
    }
  };
  useEffect(() => {
    fetchData(0, 100); // Initial fetch
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Consulting Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Avatar",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Avatar
          src={image}
          icon={!image && <UserOutlined/>}
          alt="User Image"
        />
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={datas} columns={columns} rowKey="id" />
    </div>
  );
}

export default ViewConsulting;
