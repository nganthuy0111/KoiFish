import { useEffect, useState } from "react"
import api from "../../../config/axios";
import { Avatar, Button, Card, Divider, Pagination, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";


function ConsultingViewCustomBooking() {
  const { Title, Text } = Typography;
  const navigate = useNavigate();

  const [customBookings, setCustomBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchCustomBookings = async () => {
    try {
      const response = await api.get(
        `customBooking/get?page=${page}&size=10`
      );
      const { listData, totalElements } = response.data;
      setCustomBookings(listData || []);
      setTotalElements(totalElements || 0);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    }
  };

  useEffect(() => {
    fetchCustomBookings(page);
  }, [page]);

  const handlePageChange = (page) => {
    setPage(page - 1);
    setCurrentPage(page);
  };
  return (
    <div>
    {customBookings.length > 0 ?(
        customBookings.map((customBooking) =>(
    <Card
    key={customBooking.id}
    style={{
      width: "80vw",
      margin: "20px auto",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: 10,
    }}
    >
        <div
              style={{
                display: "flex",
                
              }}
            >
              <div >
                <div
                
                >
                  
                  <Title level={4} > Customer :
                    {customBooking.customTour?.fullName}
                  </Title>
                  <Space direction="vertical" size="small">
                  <Text>
                    <strong>Phone:</strong> {customBooking.customTour.phone}
                  </Text>
                  <Text>
                    <strong>Email:</strong> {customBooking.customTour.email}
                  </Text>
                  <Text>
                    <strong>Address:</strong> {customBooking.customTour.address}
                  </Text>
                </Space>
                </div>
            
              </div>

              <Divider type="vertical" style={{ height: "auto" }} />
                  
              {/* Middle Column: Booking Information */}
              <div
                style={{ flex: 1, paddingLeft: "10px", paddingRight: "10px" }}
              >
              <Title level={4} >
                  Booking Details
                </Title>
                <Space direction="vertical" size="small">
                  <Text>
                    <strong>Booking ID:</strong> {customBooking.customBookingId}
                  </Text>
                  <Text>
                    <strong>Budget:</strong>{" "}
                    {customBooking.customTour.budget.toLocaleString("en-US")} VND
                  </Text>
                  <Text>
                    <strong>Start Date:</strong>{" "}
                    {new Date(customBooking.customTour.startDate).toISOString().split("T")[0]}
                  </Text>
                  <Text>
                    <strong>Guests:</strong> {customBooking.customTour.adult} Adult(s),{" "}
                    {customBooking.customTour.child} Child(ren), {customBooking.customTour.infant} Infant(s)
                  </Text>
                </Space>
              </div>

              <Divider type="vertical" style={{ height: "auto" }} />

              {/* Right Column: Action Button */}
              <div
                style={{
                  flex: 0.5,
                
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                  <Title level={4} >
                  Staff
                </Title>
                <Space direction="vertical" size="small">
                  <Text>
                    <strong>Consulting:</strong> {customBooking.consulting.fullName}
                  </Text>
                  <Text>
                    <strong>Sale:</strong> {" "}
                    {customBooking.account.fullName} 
                  </Text>
              
                </Space>
                <Button
                  type="primary"
                  block
                  onClick={() =>
                    navigate(`/consulting-view-order-customTour/${customBooking.customBookingId}`, {
                      state: { customerId: customBooking.customer.id },
                    })
                  }
                >
                  Manage Order
                </Button>
            
              </div>
            </div>
    </Card>
  ))
  ):(        <p style={{ textAlign: "center" }}>No bookings found for this tour.</p>
  )}

      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={totalElements}
        pageSize={4}
        style={{
          textAlign: "center",
          marginTop: 20,
          display: "flex",
          justifyContent: "end",
        }}
      />
    </div>
  )
}

export default ConsultingViewCustomBooking
