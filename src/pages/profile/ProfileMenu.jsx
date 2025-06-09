import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Flex,
  Image,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { FaAngleDown, FaHome } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdLogout, MdOutlineTour, MdPayments } from "react-icons/md";
import "./ProfileMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { BiSupport } from "react-icons/bi";

const { Header, Sider, Content } = Layout;

function ProfileMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const {
    token: { colorBgContainer, borderRadiusLG, colorText },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const profileItems = [
    {
      label: (
        <Link to="/">
          <Flex align="center">
            <Space>
              <FaHome />
              <span>Home</span>
            </Space>
          </Flex>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Flex onClick={handleLogout} align="center">
          <Space>
            <MdLogout />
            <span>Log out</span>
          </Space>
        </Flex>
      ),
      key: "1",
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: colorBgContainer }}
      >
        <Flex justify="center" style={{ marginBottom: 50, marginTop: 30 }}>
          <Image
            width={collapsed ? 50 : 80}
            style={{ borderRadius: "50%", border: "2px solid" }}
            src="/image/logo2.png"
          />
        </Flex>

        <Menu
          theme="light" // Change theme to light
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: (
                <Link style={{ color: colorText }} to="account">
                  <UserOutlined style={{ color: colorText }} />
                  <span>Acccount</span>
                </Link>
              ),
            },

            {
              key: "2",
              label: (
                <Link
                  style={{
                    color: colorText,
                    display: "flex",
                    alignItems: "center",
                  }}
                  to="tour-booking"
                >
                  <MdOutlineTour
                    style={{ color: colorText, marginRight: collapsed ? 0 : 9 }}
                  />
                  {!collapsed && <span>Tour Booking</span>}
                </Link>
              ),
            },

            {
              key: "3",
              label: (
                <Link
                  style={{
                    color: colorText,
                    display: "flex",
                    alignItems: "center",
                  }}
                  to="dream-tour-booking"
                >
                  <MdOutlineTour
                    style={{ color: colorText, marginRight: collapsed ? 0 : 9 }}
                  />
                  {!collapsed && <span>Your Dream Tour</span>}
                </Link>
              ),
            },
            {
              key: "4",
              label: (
                <Link
                  style={{
                    color: colorText,
                    display: "flex",
                    alignItems: "center",
                  }}
                  to="supports"
                >
                  <BiSupport
                    style={{ color: colorText, marginRight: collapsed ? 0 : 9 }}
                  />
                  {!collapsed && <span>Supports</span>}
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: "fit-content",
          }}
        >
          <Flex justify="space-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: colorText,
              }}
            />

            <div style={{ marginRight: 50 }}>
              <Space size="middle">
                <Dropdown
                  menu={{
                    items: profileItems,
                  }}
                  trigger={["click"]}
                  overlayClassName="profile-dropdown-menu"
                >
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{ color: "black" }}
                  >
                    <Space>
                      <span style={{ fontWeight: "bold" }}>
                        Hello {user.fullName}
                      </span>
                      <FaAngleDown />
                    </Space>
                  </a>
                </Dropdown>
              </Space>
            </div>
          </Flex>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ProfileMenu;
