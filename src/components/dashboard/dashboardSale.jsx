import { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  EyeOutlined,
  HomeFilled,
  HomeOutlined,
  SendOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Avatar, Input, Dropdown } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";
import { logout } from "../../redux/features/userSlice";

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/dashboardSale/${key}`}>{label}</Link>,
  };
}

const items = [
  getItem("View Consulting", "viewcst", <EyeOutlined />),
  getItem("View Customer", "customer", <EyeOutlined />),
  getItem("Manage Tour", "tour", <AppstoreOutlined />),
  getItem("Open Tour", "manageOpenTour", <AppstoreOutlined />),
  getItem("Create Quotation", "manageQuotation", <AppstoreOutlined />),
  getItem("Create Booking", "manageCustomTour", <AppstoreOutlined />),
];

const DashboardSale = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  // Lấy role của người dùng từ Redux
  const role = useSelector((state) => state.user.role);

  // Kiểm tra role và điều hướng nếu không phù hợp
  useEffect(() => {
    if (role !== "SALE") {
      navigate("/unauthorized"); // Điều hướng đến trang unauthorized nếu không phải SALE
    }
  }, [role, navigate]);

  // Trả về null nếu không có quyền
  if (role !== "SALE") {
    return null;
  }

  return (
    <Layout className="dashboard-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="dashboard-sider"
      >
        <div className="logo-container">
          <img src="/image/logo2.png" alt="Koi Fish" className="logo" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="dashboard-header">
          <div className="header-content">
            <div className="header-title">SALE MANAGEMENT</div>
            <div className="search-container"></div>

            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="3" onClick={handleLogout}>
                    <strong>Logout</strong>
                  </Menu.Item>
                </Menu>
              }
            >
              <Avatar
                size="large"
                icon={<UserOutlined />}
                className="header-avatar"
              />
            </Dropdown>
          </div>
        </Header>

        <Content className="dashboard-content">
          <div className="content-header">
            <Breadcrumb className="dashboard-breadcrumb"></Breadcrumb>
          </div>
          <div className="dashboard-inner-content">
            <Outlet />
          </div>
        </Content>
        <Footer className="dashboard-footer">
          Koi Fish Dashboard ©{new Date().getFullYear()} Created by
          KoiFIshTour99 Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardSale;
