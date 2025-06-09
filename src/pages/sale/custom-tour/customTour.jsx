import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Table,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";

function ManageCustomTourSale() {
  const [customTour, setCustomTour] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [currentTourId, setCurrentTourId] = useState(null);
  const [form] = Form.useForm();
  const [bookingForm] = Form.useForm();
  const [farmOptions, setFarmOptions] = useState([]);
  const [consultingOptions, setConsultingOptions] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const fetchData = async (page, pageSize) => {
    try {
      const [
        bookingResponse,
        customResponse,
        farmResponse,
        consultantResponse,
      ] = await Promise.all([
        api.get(`booking?page=${page - 1}&size=${pageSize}`),
        api.get(`customTour/get?page=${page - 1}&size=${pageSize}`),
        api.get(`/farm/guest/get?page=${page - 1}&size=${pageSize}`),
        api.get(`account?page=${page - 1}&size=${pageSize}`),
      ]);

      const { totalElements } = bookingResponse.data.listData;
      const listCustom = customResponse.data.listData;
      setCustomTour(listCustom || customResponse.data);

      setFarmOptions(
        farmResponse.data.listData.map((farm) => ({
          label: farm.farmName,
          value: farm.id,
        }))
      );

      const allConsultant = consultantResponse.data.listData.filter(
        (account) => account.role === "CONSULTING"
      );
      console.log(allConsultant);
      setConsultingOptions(
        allConsultant.map((consultant) => ({
          label: consultant.fullName,
          value: consultant.id,
        }))
      );

      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
    } catch (err) {
      toast.error(err.bookingResponse || "Error fetching data");
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Budget", dataIndex: "budget", key: "budget",  render: (value) => `${value.toLocaleString("en-US")} VND`,
  },
    { title: "Adults", dataIndex: "adult", key: "adult" },
    { title: "Children", dataIndex: "child", key: "child" },
    { title: "Infants", dataIndex: "infant", key: "infant" },
    {
      title: "Farms",
      dataIndex: "farms",
      key: "farms",
      render: (farms) => farms.map((farm) => farm.farmName).join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleCreateBooking(record)}>
          Create Booking
        </Button>
      ),
    },
  ];

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const requestData = {
        tourName: values.tourName,
        startDate: values.startDate.format("YYYY-MM-DD"),
        duration: values.duration,
        image: values.image,
        description: values.description,
        price: values.price,
        time: values.time.format("HH:mm"),
        consultingId: values.consultingId,
        farmId: values.farmId,
        deleted: false,
      };

      const response = await api.post("/tour", requestData);
      toast.success("Tour created successfully!");
      setCustomTour((prevTours) => [...prevTours, response.data]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create tour");
    }
  };

  const handleCreateBooking = (record) => {
    setCurrentTourId(record.id);
    setIsBookingModalVisible(true);
  };

  const handleBookingModalOk = async () => {
    try {
      const values = await bookingForm.validateFields();
      const requestData = {
        customTourId: currentTourId,
        consultingId: values.consultingId,
        price: values.price,
      };

      await api.post("/customBooking", requestData);
      toast.success("Booking created successfully!");

      // Remove the booked tour from the display list
      setCustomTour((prevTours) =>
        prevTours.filter((tour) => tour.id !== currentTourId)
      );

      setIsBookingModalVisible(false);
      bookingForm.resetFields();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create booking");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleBookingModalCancel = () => {
    setIsBookingModalVisible(false);
    bookingForm.resetFields();
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div>
      <Table
        columns={columns}
        dataSource={customTour}
        pagination={pagination}
        rowKey="id"
      />
      <Modal
        title="Create New Tour"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          {/* Tour creation form fields go here */}
        </Form>
      </Modal>

      <Modal
        title="Create Booking"
        visible={isBookingModalVisible}
        onOk={handleBookingModalOk}
        onCancel={handleBookingModalCancel}
      >
        <Form form={bookingForm} layout="vertical">
          <Form.Item
            name="consultingId"
            label="Consulting ID"
            rules={[
              { required: true, message: "Please select a Consulting ID!" },
            ]}
          >
            <Select
              options={consultingOptions}
              placeholder="Select a consultant"
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <Input placeholder="Enter Price" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageCustomTourSale;
