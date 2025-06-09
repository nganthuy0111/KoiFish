import { useState, useEffect } from "react";
import { Table, Rate } from "antd";
import api from "../../config/axios";
import { toast } from "react-toastify";

function FeedbackView() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
    total: 0,
  });

  const fetchFeedback = async (page, size) => {
    setLoading(true);
    try {
      const response = await api.get("feedback/guest/get", {
        params: {
          page: page - 1, // Backend có thể dùng chỉ số trang bắt đầu từ 0
          size: size,
        },
      });
      const { listData, totalElements } = response.data;
      setFeedbackData(listData);
      setPagination({
        ...pagination,
        total: totalElements,
        current: page,
      });
    } catch (err) {
      toast.error("Error fetching feedback data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback(pagination.current, pagination.size);
  }, []);

  const handleTableChange = (pagination) => {
    fetchFeedback(pagination.current, pagination.size);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate value={rating} disabled />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Customer Name",
      dataIndex: "nameCustomer",
      key: "nameCustomer",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Table
        columns={columns}
        dataSource={feedbackData}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          size: pagination.size,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default FeedbackView;
