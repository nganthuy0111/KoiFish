import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Select,
  Button,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const { Title } = Typography;
const { Option } = Select;

const months = [
  { value: 1, name: "January" },
  { value: 2, name: "February" },
  { value: 3, name: "March" },
  { value: 4, name: "April" },
  { value: 5, name: "May" },
  { value: 6, name: "June" },
  { value: 7, name: "July" },
  { value: 8, name: "August" },
  { value: 9, name: "September" },
  { value: 10, name: "October" },
  { value: 11, name: "November" },
  { value: 12, name: "December" },
];

function OverView() {
  const [data, setData] = useState();
  const [roles, setRoles] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [orderCount, setOrderCount] = useState(null);
  const [bookingCount, setBookingCount] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get("/dashboard/stats");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleYearChange = (date, dateString) => {
    setYear(dateString);
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get("/role");
      console.log(response.data);
      const rolesData = Object.keys(response.data).map((role) => ({
        name: role,
        value: response.data[role],
      }));
      setRoles(rolesData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchCounts = async () => {
    try {
      const orderResponse = await api.post(`/dashboard/count-order`, {
        month,
        year,
      });
      const bookingResponse = await api.post(`/dashboard/count-booking`, {
        month,
        year,
      });
      setOrderCount(orderResponse.data);
      setBookingCount(bookingResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRoles();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#f277f0"];

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Dashboard Overview
      </Title>

      <Card bordered={false} style={{ marginBottom: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          {/* Ô chọn tháng và năm */}
          <Col xs={24} md={8}>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={12}>
                <Select
                  placeholder="Select month"
                  style={{ width: "100%" }}
                  onChange={(value) => setMonth(value)}
                >
                  {months.map((month) => (
                    <Option key={month.value} value={month.value}>
                      {month.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={12}>
                <DatePicker
                  placeholder="Select year"
                  picker="year" // Chỉ cho phép chọn năm
                  style={{ width: "100%" }}
                  onChange={handleYearChange}
                />
              </Col>
              <Col xs={24} style={{ marginTop: "16px" }}>
                <Button type="primary" onClick={handleFetchCounts} block>
                  Submit
                </Button>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={16}>
            <Row gutter={[16, 16]}>
              <Col xs={12}>
                <Statistic
                  title="Total orders in month"
                  value={orderCount !== null ? orderCount : "-"}
                  valueStyle={{ color: "#3f8600", fontSize: "1.5em" }}
                />
              </Col>
              <Col xs={12}>
                <Statistic
                  title="Total booking in month"
                  value={bookingCount !== null ? bookingCount : "-"}
                  valueStyle={{ color: "#3f8600", fontSize: "1.5em" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card bordered={false} style={{ textAlign: "center" }}>
            <Statistic
              title="Total Orders"
              value={data?.totalOrders}
              valueStyle={{ color: "#3f8600", fontSize: "1.5em" }}
              suffix="Orders"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card bordered={false} style={{ textAlign: "center" }}>
            <Statistic
              title="Total Users"
              value={data?.customerCount}
              valueStyle={{ color: "#3f8600", fontSize: "1.5em" }}
              suffix="Customers"
            />
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            title="Top Tour"
            style={{ textAlign: "center" }}
          >
            <PieChart width={400} height={320}>
              <Pie
                data={data?.topTour}
                dataKey="TotalBooking"
                nameKey="TourName"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {data?.topTour?.map((item, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            bordered={false}
            title="User Roles Distribution"
            style={{ textAlign: "center" }}
          >
            <PieChart width={400} height={320}>
              <Pie
                data={roles}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#82ca9d"
                label
              >
                {roles?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OverView;
