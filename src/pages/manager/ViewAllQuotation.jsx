import { Table, Button, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

function ViewAllQuotation() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  const columns = [
    {
      title: "Quotation ID",
      dataIndex: "quotationId",
      key: "quotationId",
    },
    {
      title: "Adult Price",
      dataIndex: "adultPrice",
      key: "adultPrice",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    },
    {
      title: "Child Price",
      dataIndex: "childPrice",
      key: "childPrice",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const fetchQuotations = async (
    page = pagination.current,
    pageSize = pagination.pageSize
  ) => {
    try {
      setLoading(true);
      const response = await api.get("/quotation/cancel", {
        params: {
          page: page - 1,
          size: pageSize,
        },
      });
      const { listData, totalElements } = response.data;
      setQuotations(listData);
      setPagination((prev) => ({
        ...prev,
        total: totalElements,
        current: page,
        pageSize,
      }));
    } catch (err) {
      toast.error("Error fetching quotations");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination) => {
    if (newPagination.pageSize !== pagination.pageSize) {
      fetchQuotations(1, newPagination.pageSize);
    } else {
      fetchQuotations(newPagination.current, newPagination.pageSize);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Table
        dataSource={quotations}
        columns={columns}
        rowKey="quotationId"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default ViewAllQuotation;
