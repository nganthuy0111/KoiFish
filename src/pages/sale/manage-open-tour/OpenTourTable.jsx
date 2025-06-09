import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";

function OpenTourTable() {
  const [openTours, setOpenTours] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchOpenTour = async (page, size) => {
    setLoading(true);
    try {
      const response = await api.get(
        `open-tour/guest/get?page=${page - 1}&size=${size}`
      );
      setOpenTours(response.data.listData);
      console.log(response.data);
      setPagination({
        current: page,
        pageSize: size,
        total: response.data.totalElements,
      });
    } catch (error) {
      message.error("Cannot fetch data of open tours!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenTour(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    fetchOpenTour(pagination.current, pagination.pageSize);
  };

  const handleCloseTour = async (tourId) => {
    try {
      const response = await api.put(`open-tour/set-not-open/${tourId}`);
      message.success("Close tour successfully!");
      fetchOpenTour(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("Cannot close tour!");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tour Id",
      dataIndex: "tourId",
      key: "tourId",
    },
    {
      title: "Tour Name",
      dataIndex: "tourName",
      key: "tourName",
    },
    {
      title: "Sale Id",
      dataIndex: "saleId",
      key: "saleId",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString() + " VND",
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
      render: (schedule) => (
        <Button type="primary" onClick={() => window.open(schedule, "_blank")}>
          View schedule
        </Button>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          style={{ backgroundColor: "red" }}
          onClick={() => handleCloseTour(record.id)}
          type="primary"
        >
          Close Tour
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={openTours}
      rowKey="id"
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
}

export default OpenTourTable;
