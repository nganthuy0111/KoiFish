import { useState } from "react";
import {
  AppstoreOutlined,
  EyeOutlined,
  HomeFilled,
  HomeOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Avatar, Input, Dropdown } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/consulting/${key}`}>{label}</Link>,
  };
}

const items = [
  getItem("Tour", "tour", <AppstoreOutlined />),
  getItem("Dream Tour", "consultingViewCustomBooking", <AppstoreOutlined />),
];

const ConsultingDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

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
            <div className="header-title">CONSULTING MANAGEMENT</div>
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

export default ConsultingDashboard;
