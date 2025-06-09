import { Table, Button, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import api from "../../config/axios";
import { toast } from "react-toastify";

function CRUDTemplateManager({ columns, path }) {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"], 
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async (
    page = pagination.current,
    pageSize = pagination.pageSize
  ) => {
    try {
      setLoading(true);
      const response = await api.get(path, {
        params: {
          page: page - 1, // Giả sử API của bạn bắt đầu từ trang 0
          size: pageSize,
        },
      });
      const { listData, totalElements } = response.data;
      setDatas(listData);
      setPagination((prev) => ({
        ...prev,
        total: totalElements,
        current: page,
        pageSize,
      }));
    } catch (err) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination, filters, sorter) => {
    // Kiểm tra xem pageSize có thay đổi không
    if (newPagination.pageSize !== pagination.pageSize) {
      fetchData(1, newPagination.pageSize); // Khi thay đổi pageSize, reset về trang 1
    } else {
      fetchData(newPagination.current, newPagination.pageSize);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      {/* 
      <Button
        type="primary"
        onClick={() => {
          form.resetFields();
          setShowModal(true);
        }}
        style={{ marginBottom: "20px" }}
      >
        Add New
      </Button> 
      */}
      <Table
        dataSource={datas}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title="Manage Item"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" hidden>
            <Input type="hidden" />
          </Form.Item>
          {/* Thêm các trường form khác nếu cần */}
        </Form>
      </Modal>
    </div>
  );
}

export default CRUDTemplateManager;
