import { Button, Image, Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import OrderProgressSteps from '../../../components/order-step/OrderProgressSteps'
import EditOrderModal from '../../../components/cud-order/EditOrderModel'
import api from '../../../config/axios';
import { useLocation, useParams } from 'react-router-dom';

function OrderListCustom() {
    const { id } = useParams(); // Get customer ID from URL path
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [availableFish, setAvailableFish] = useState([]); // State for available fish list
  
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 6,
      total: 0,
    });
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || 0;
    const size = queryParams.get("size") || pagination.pageSize;
    const [editOrder, setEditOrder] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  
    const [newOrder, setNewOrder] = useState({
      customerId: 0,
      cusBookingId: 0,
      status: "PENDING",
      paidMoney: 0,
      totalPrice: 0,
      shoppingCart: [],
    });
    
    const fetchOrdersAndFish = async () => {
      try {
        const ordersResponse = await api.get(`order/booking/${id}`);
        const ordersList = Array.isArray(ordersResponse.data) ? ordersResponse.data : [ordersResponse.data];      
        if (!ordersList || ordersList.length === 0) {
          message.warning("No orders found for this booking ID.");
          setOrders([]);
          return;
        }
        setOrders(ordersList);
        const bookingId = ordersList[0].booking?.customBookingId;
        const customerId = ordersList[0].customer?.id;
        setNewOrder((prev) => ({ ...prev, bookingId: bookingId || 0, customerId: customerId || 0 }));
        setPagination((prev) => ({ ...prev, total: ordersList.length }));
        if (bookingId) {
          const fishResponse = await api.get(`koi/listKoiFish`, { params: { page: 0, size: 100, id: bookingId } });
          setAvailableFish(fishResponse.data.listData || []);
        }
      } catch (err) {
        console.error("Error fetching orders and available fish:", err);
        message.error(err.response?.data?.message || "Failed to fetch orders and available fish");
      }
    };
  
    useEffect(() => {
      fetchOrdersAndFish();
    }, [id]);
  
    
    const showEditModal = (order) => {
      setEditOrder(order);
      setIsEditModalVisible(true);
    };
  
    const handleUpdateOrder = async (orderId, updateData) => {
      try {
        await api.put(`order/${orderId}`, updateData);
        fetchOrdersAndFish();
      } catch (err) {
        console.error("Error updating order:", err);
      }
    };
  
  
  
  
    const updateOrderToDelivering = async (orderId) => {
      let deliveryNote = '';
      Modal.confirm({
        title: 'Enter estimated delivery date',
        content: (
          <Input
            placeholder="Enter delivery date or note"
            onChange={(e) => (deliveryNote = e.target.value)}
          />
        ),
        onOk: async () => {
          try {
            await api.put(`order/delivering/${orderId}`, { deliveryNote });
            message.success("Order status updated to delivering with note");
            fetchOrdersAndFish(page, size); // Refresh the list to reflect the updated status
          } catch (error) {
            console.error("Error updating order to delivering:", error);
            message.error("Failed to update order status to delivering");
          }
        },
      });
    };
    const updateOrderToDone = async (orderId) => {
      try {
        await api.put(`order/done/${orderId}`);
        message.success("Order marked as done");
        fetchOrdersAndFish(page, size); // Refresh the list to reflect the updated status
      } catch (error) {
        console.error("Error updating order to done:", error);
        message.error("Failed to update order status to done");
      }
    };
  return (
    <div>
        <div className="order-space">
      <div className="order-items">
        {orders.map((item) => (
          <div key={item.id} className="items-or">
            <div className="fish-items">
              <table className="fish-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Breed Name</th>
                    <th>Farm Name</th>
                  </tr>
                </thead>
                <tbody>
                  <h3 className="topic-order">Your Fish Order</h3>
                  {item.shoppingCarts?.map((cart, index) => (
                    <tr key={index} className="fishList-order">
                      <td>
                        <Image src={cart.koiFish?.images} alt="Fish Image" className="image-order" />
                      </td>
                      <td>{cart.koiFish?.breed?.breedName}</td>
                      <td>{cart.koiFish?.farm?.farmName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="order-detail">
              <div className="detail-cus">
                <h2 style={{ color: "orange" }}>Order Summary</h2>
                <p>Order Code: {item.koiFishOrderId}</p>
                <p>Customer: {item.customer?.fullName}</p>
                <p>
                  <strong style={{ color: "orange" }}>Total Price: </strong>
                  {item.totalPrice}
                </p>
                <h3>
                  <strong style={{ color: "f2561d" }}>Paid Money: </strong>
                  {item.paidMoney}
                </h3>
                {item.status === "CANCEL" && (
              <div className="order-cancel-note">
                <strong>Note Reason Cancel:</strong> {item.notes}
              </div>
            )}
                <div className="order-btn">

                  {item.status === "CONFIRM" && (
                    <Button className="btn-delivering-order" onClick={() => updateOrderToDelivering(item.id)}>
                      Delivering
                    </Button>
                  )}
                  {item.status === "DELIVERING" && (
                    <Button className="btn-done-order" onClick={() => updateOrderToDone(item.id)}>
                      Done
                    </Button>
                  )}
                  {item.status !== "CONFIRM" && item.status !== "DELIVERING" && (
                    <Button className="btn-update-order" onClick={() => showEditModal(item)}>
                      Update Order
                    </Button>
                  )}
                </div>
                <OrderProgressSteps status={item.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {editOrder && (
        <EditOrderModal
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          order={editOrder}
          availableFish={availableFish}
          onUpdate={handleUpdateOrder}
        />
      )}


    </div>
    </div>
  )
}

export default OrderListCustom
