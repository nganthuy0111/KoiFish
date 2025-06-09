import { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Button, Image, Input } from "antd";
import { useLocation } from "react-router-dom";
import OrderProgressSteps from "../../components/order-step/OrderProgressSteps";

function CustomerViewOrder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [showCancelInput, setShowCancelInput] = useState(false); // State to control visibility of the reason input

  const bookingId = queryParams.get("id");
  const [cancelReason, setCancelReason] = useState("");
  const [datas, setDatas] = useState({});

  const fetchData = async () => {
    try {
      const response = await api.get(`/order/booking/${bookingId}`);
      setDatas(response.data);
    } catch (err) {
      console.error("Error fetching order:", err);
      toast.error(err.response?.data?.message || err.message || "Error occurred");
    }
  };

  const handleConfirmOrder = async () => {
    try {
      await api.put(`order/confirm/${datas.id}`);
      toast.success("Order confirmed successfully!");
      fetchData();
    } catch (err) {
      console.error("Error confirming order:", err);
      toast.error(err.response?.data?.message || err.message || "Error occurred");
    }
  };

  const handleCancelOrder = async () => {
    try {
      await api.put(`order/cancel/${datas.id}`, { reason: cancelReason }); // Send the reason in the body
      toast.success("Order cancelled successfully!");
      setShowCancelInput(false); // Hide the input after cancellation
      setCancelReason(""); // Clear the input field
      fetchData();
    } catch (err) {
      console.error("Error cancelling order:", err);
      toast.error(err.response?.data?.message || err.message || "Error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, [bookingId]);

  return;
}

export default CustomerViewOrder;
