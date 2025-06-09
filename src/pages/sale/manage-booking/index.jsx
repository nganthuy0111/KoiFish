import {  Button, Form, Input,  message,  Modal,  Select, } from "antd";
import CRUDBooking from "../../../components/crud-template/booking-crud";
import { useState } from "react";
import AddScheduleModal from "../../../components/add-schedule/AddScheduleModal";

function ManageBooking() {
  
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
  const [selectedBookingId, setSelectedBookingId] = useState(null); // Store booking ID for schedule

  // Mở modal và thiết lập bookingId khi nhấn "Add Schedule"
  const handleAddSchedule = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsModalVisible(true);
  };
  const columns = [
    {
      title: "Tour Name",
      dataIndex: "tourName",
      key: "tourName",
    },
    {
      title: "Customer Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Adult",
      dataIndex: "adult",
      key: "adult",
    },
    {
      title: "Child",
      dataIndex: "child",
      key: "child",
    },
    {
      title: "Infant",
      dataIndex: "infant",
      key: "infant",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

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
          onClick={() => handleAddSchedule(record.bookingId)} // Gọi hàm với id của booking
        >
          Add Schedule
        </Button>
      ),
    },
  ];
  const statusOptions = [
    { label: "PENDING", value: "PENDING" },
    { label: "APPOVE", value: "APPROVE" },
    { label: "CANCEL", value: "CANCEL" },
    
  ];
  const formItems = (
        <>
          <Form.Item name="id" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select a status!" }]}
      >
      <Select options={statusOptions} placeholder="Select status" />
      </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="fullName" label="Name">
            <Input />
          </Form.Item> 
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="adult" label="Adult">
            <Input />
          </Form.Item>
          <Form.Item name="child" label="Child">
            <Input />
          </Form.Item>
          <Form.Item name="infant" label="Infant">
            <Input />
          </Form.Item> 
          <Form.Item name="customerId" label="Customer Id">
            <Input />
          </Form.Item>  
          <Form.Item name="tourId" label="Tour Id">
            <Input />
          </Form.Item>   
        </>       
  )
  return (
    <div>
       <AddScheduleModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        bookingId={selectedBookingId}
      />


          <CRUDBooking columns={columns} formItems={formItems} path="booking" />
    </div>
  );
}

export default ManageBooking;
