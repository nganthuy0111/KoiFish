
import { Button, message, Table } from 'antd';
import CRUDCustomBooking from '../../../components/crud-template/crudCustomBooking';
import api from '../../../config/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageOrderCustomBooking() {
    const [selectedBooking, setSelectedBooking] = useState(null); // Store selected booking details
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({ totalPrice: 0, paidMoney: 0, shoppingCart: [] });

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 6,
        total: 0,
      });
      const navigate = useNavigate();
      const [bookings, setBookings] = useState([]);
      const fetchBookings = async (page, pageSize) => {
        try {
          const response = await api.get(
            `customBooking/get?page=${page - 1}&size=${pageSize}`
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
    const fetchAllOrders = async (page, pageSize) => {
        try {
          const response = await api.get(`order/all?page=${page - 1}&size=${pageSize}`);
          const { listData } = response.data;
          setOrders(listData || response.data.listKoiFishOrder);
        } catch (err) {
          console.error("Error fetching orders:", err);
          message.error(err.response?.data?.message || "Failed to fetch orders");
        }
      };
      useEffect(() => {
        fetchAllOrders(pagination.current, pagination.pageSize);
        fetchBookings(pagination.current, pagination.pageSize);

      },[pagination.current, pagination.pageSize]);

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
          const selectedBookingData = bookings.find(booking => booking.bookingId === bookingId);
          setSelectedBooking(selectedBookingData);
          setNewOrder({ totalPrice: 0, paidMoney: 0, shoppingCart: [] }); 
          message.warning("No existing order for this booking. Please add a new order.");
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
          title: "ID",
          dataIndex: "id",
          key: "id",
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
        },  
        {
            title: "Consulting Name",
            dataIndex: "consulting",
            key: "consulting",
            render: (consulting) => <span>{consulting?.fullName}</span>,
          }, 
          {
            title: "Sale Name",
            dataIndex: "account",
            key: "account",
            render: (account) => <span>{account?.fullName}</span>,
          },  
          {
            title: "Action",
            key: "action",
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
          rowKey="bookingId"
        />   
          {selectedBooking && (
        <div style={{ marginTop: "20px" }}>
          <h3>Add Order for Booking: {selectedBooking.customBookingId}</h3>
          <Button type="primary" onClick={handleAddOrder}>
            Add Order
          </Button>
        </div>
      )}    </div>
  )
}

export default ManageOrderCustomBooking;
