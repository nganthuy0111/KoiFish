import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import { Button, message, Table } from "antd";
import moment from "moment";
import AddScheduleModal from "../../../components/add-schedule/AddScheduleModal";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null); // Store selected booking details
  const [newOrder, setNewOrder] = useState({
    totalPrice: 0,
    paidMoney: 0,
    shoppingCart: [],
  });
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const navigate = useNavigate();
  const handleAddSchedule = (bookingId) => {
    const selectedBookingData = bookings.find(
      (booking) => booking.bookingId === bookingId
    );
    setSelectedBooking(selectedBookingData); // Set the whole booking object
    setIsModalVisible(true); // Show modal
  };

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const page = queryParams.get("page") || 0;
  const size = queryParams.get("size") || pagination.pageSize;

  // Fetch Bookings
  const fetchBookings = async (page, pageSize) => {
    try {
      const response = await api.get(
        `booking/Consulting?page=${page - 1}&size=${pageSize}&id=${id}`
      );
      const { listData, totalElements } = response.data;
      setBookings(listData || response.data.listData);
      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
    } catch (err) {
      console.error("Error fetching bookings:", err);
      message.error(err.response?.data?.message || "Failed to fetch bookings");
    }
  };

  // Fetch All Orders
  const fetchAllOrders = async (page, pageSize) => {
    try {
      const response = await api.get(
        `order/all?page=${page - 1}&size=${pageSize}`
      );
      const { listData } = response.data;
      setOrders(listData || response.data.listKoiFishOrder);
    } catch (err) {
      console.error("Error fetching orders:", err);
      message.error(err.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchBookings(pagination.current, pagination.pageSize);
    fetchAllOrders(pagination.current, pagination.pageSize);
  }, [id, page, size]);

  const handleViewOrder = (bookingId) => {
    if (!orders || !Array.isArray(orders)) {
      console.warn("Orders data is not properly loaded or is not an array.");
      return;
    }

    const orderExists = orders.some(order => {


  
      const found = order.booking?.bookingId === bookingId;
      if (found) {
        console.log("Order found for Booking ID:", bookingId);
      }
      return found;
    });

    if (orderExists) {
      navigate(`/consulting/booking/order/${bookingId}`);
    } else {
      const selectedBookingData = bookings.find(
        (booking) => booking.bookingId === bookingId
      );
      setSelectedBooking(selectedBookingData);
      setNewOrder({ totalPrice: 0, paidMoney: 0, shoppingCart: [] }); // Set default values
      message.warning(
        "No existing order for this booking. Please add a new order."
      );
    }
  };

  const handleAddOrder = async () => {
    if (!selectedBooking) {
      message.error("Please select a booking to add an order.");
      return;
    }

    const orderData = {
      ...newOrder,
      customerId: selectedBooking.customerId,
      bookingId: selectedBooking.bookingId,
    };

    try {
      await api.post("order", orderData);
      message.success("Order added successfully");
      fetchAllOrders(pagination.current, pagination.pageSize); // Refresh orders list
      setSelectedBooking(null); // Reset after adding order
    } catch (err) {
      console.error("Error adding order:", err);
      message.error(err.response?.data?.message || "Failed to add order");
    }
  };

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Customer Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          disabled={record.deleted}
          onClick={() => handleAddSchedule(record.bookingId)}
        >
          Add schedule
        </Button>
      ),
    },
    {
      title: "Action 2",
      key: "action2",
      render: (text, record) => (
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          disabled={record.deleted}
          onClick={() => handleViewOrder(record.bookingId)}
        >
          View Order
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={bookings}
        columns={columns}
        pagination={pagination}
        onChange={(page) => fetchBookings(page.current, page.pageSize)}
        rowKey="bookingId"
      />
      {selectedBooking && (
        <AddScheduleModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          booking={selectedBooking}
        />
      )}
      {/* Simplified Add Order Section - Only Button */}
      {selectedBooking && (
        <div style={{ marginTop: "20px" }}>
          <h3>Add Order for Booking: {selectedBooking.bookingId}</h3>
          <Button type="primary" onClick={handleAddOrder}>
            Add Order
          </Button>
        </div>
      )}
    </div>
  );
}

export default BookingList;
