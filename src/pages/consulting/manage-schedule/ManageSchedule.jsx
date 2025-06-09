import React, { useEffect, useState } from 'react'
import api from '../../../config/axios';
import { toast } from 'react-toastify';
import { Image } from 'antd';

function ManageSchedule() {
  const [datas, setDatas] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1, // current page
    pageSize: 6, // page size
    total: 0,
  });

  const fetchData = async (page, pageSize) => {
    try {
      const response = await api.get(`schedule/booking?page=${page - 1}&size=${pageSize}`);
      const { listData, totalElements } = response.data;

      setDatas(listData || response.data.listData);
      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
      console.log(listData);
    } catch (err) {
      console.error("Error fetching data ", err);
      toast.error(err.response?.data?.message || err.message || "Error occurred");
    }
  };
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
        <Image
          src={image}
      
          alt="User Image"
        />
      ),
    },
  ];
  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize); 
  }, []);


  return (
    <div>
      
    </div>
  )
}

export default ManageSchedule;
