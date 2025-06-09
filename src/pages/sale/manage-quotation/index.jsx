import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Modal, Table } from "antd";
import { useSelector } from "react-redux";

function ManageQuotationSale() {
  const [booking, setBooking] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = useForm();
  const [selectBookingId, setSelectBookingId] = useState();
  const user = useSelector((state) => state.user);
  const customBookingId = user?.id ?? null;

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });

  const fetchData = async (page, pageSize) => {
    try {
      const { data } = await api.get(
        `customBooking/get?page=${page - 1}&size=${pageSize}`
      );
      const { totalElements, listData } = data;

      const filteredBookingData = listData.filter((item) => !item.deleted);
      setBooking(filteredBookingData);

      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error occurred while fetching data"
      );
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const handleSubmit = async (values) => {
    const perAdultPrice = isNaN(values.perAdultPrice)
      ? 0
      : parseInt(values.perAdultPrice, 10);
    const perChildPrice = isNaN(values.perChildPrice)
      ? 0
      : parseInt(values.perChildPrice, 10);

    try {
      const payload = {
        customBookingId: selectBookingId,
        perAdultPrice,
        perChildPrice,
      };

      await api.post("quotation", payload);
      setIsOpen(false);
      toast.success("Quotation created successfully");
      form.resetFields();

      setBooking((prevBookings) =>
        prevBookings.filter((item) => item.id !== selectBookingId)
      );
      fetchData(pagination.current, pagination.pageSize);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Error occurred"
      );
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Consulting Name",
      dataIndex: ["consulting", "fullName"],
      key: "consultingName",
    },
    {
      title: "Customer Name",
      dataIndex: ["customTour", "customer", "fullName"],
      key: "customerName",
    },
    {
      title: "Create At",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    
    },
    {
      title: "Farms",
      key: "farms",
      render: (_, record) => (
        <>
          {record.customTour.farms.map((farm) => (
            <div key={farm.id}>
              <span>{farm.farmName}</span>
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectBookingId(record.id);
            form.setFieldsValue({ perAdultPrice: "", perChildPrice: "" });
            setIsOpen(true);
          }}
        >
          Create Quotation
        </Button>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPagination((prev) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  return (
    <div>
      <Table
        dataSource={booking}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        rowKey="id"
      />
      <Modal
        title="Add Quotation"
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="perAdultPrice"
            label="Adult Price"
            rules={[{ required: true, message: "Please input Adult Price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="perChildPrice"
            label="Child Price"
            rules={[{ required: true, message: "Please input Child Price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageQuotationSale;
