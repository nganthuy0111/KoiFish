// HomePageHeader.js
import { Button, Dropdown, Flex, Image, Modal, Select, Space } from "antd";
import { useState } from "react";
import "./HomePageHeader.css";
import { Link, useNavigate } from "react-router-dom";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { logout } from "../../redux/features/userSlice";

function HomePageHeader() {
  const user = useSelector((store) => store.user);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isRegisFormOpen, setIsRegisFormOpen] = useState(false);
  const defaultProfileImg = "/image/defaultProfile.png";
  const [userAvatar, setUserAvatar] = useState(
    user ? user.image : defaultProfileImg
  );
  const navigate = useNavigate();

  const userLoggedIn = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const showLoginForm = () => {
    setIsRegisFormOpen(false);
    setIsLoginFormOpen(true);
  };

  const showRegisForm = () => {
    setIsLoginFormOpen(false);
    setIsRegisFormOpen(true);
  };

  const closeForm = () => {
    setIsLoginFormOpen(false);
    setIsRegisFormOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  const propItems = [
    {
      label: (
        <Link to="profile">
          <Flex align="center">
            <Space>
              <CgProfile />
              <span>Profile</span>
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
    <>
      <div className="header-container">
        <Flex justify="space-around" align="center">
          <Flex align="center" vertical>
            <img
              src="/image/logo2.png"
              onClick={() => navigate("/")}
              className="logo"
            />
            <h4 style={{ color: "#ff8a33" }}>Koi Fish Tour</h4>
          </Flex>
          <div>
            <Button className="link-button" type="link">
              <Link to="/">Home</Link>
            </Button>
            <Button className="link-button" type="link">
              <Link to="/aboutus" style={{ textDecoration: "none" }}>
                About Us
              </Link>
            </Button>
            <Button className="link-button" type="link">
              <Link to="/tourpackage">Tour Packages</Link>
            </Button>
            <Button className="link-button" type="link">
              <Link to="/farmPackage" style={{ textDecoration: "none" }}>
                Farm
              </Link>
            </Button>
            <Button className="link-button" type="link">
              <Link to="/homePage-koiFish" style={{ textDecoration: "none" }}>
                Koi Fish
              </Link>
            </Button>
          </div>
          <div>
            <Space>
              <Select
                defaultValue={["EN"]}
                variant="borderless"
                style={{
                  flex: 1,
                }}
                options={[
                  {
                    value: "EN",
                    label: "EN",
                  },
                  {
                    value: "VN",
                    label: "VN",
                  },
                ]}
              />
              <div>
                {userLoggedIn ? (
                  <div style={{ marginLeft: 10, color: "gray" }}>
                    <Dropdown
                      menu={{
                        items: propItems,
                      }}
                      trigger={["click"]}
                      overlayClassName="custom-dropdown-menu"
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <Image
                            preview={false}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                            width={50}
                            height={50}
                            src={userAvatar}
                            onError={() => setUserAvatar(defaultProfileImg)}
                          />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={showLoginForm}
                      style={{
                        color: "gray",
                        fontWeight: "bold",
                      }}
                      type="text"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={showRegisForm}
                      type="primary"
                      style={{
                        backgroundColor: "#ff8a33",
                        borderColor: "#ff8a33",
                        width: "120px",
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </Space>
          </div>
        </Flex>
      </div>

      <Modal open={isLoginFormOpen} onCancel={closeForm} footer={null}>
        <LoginPage showRegisForm={showRegisForm} closeLoginForm={closeForm} />
      </Modal>

      <Modal open={isRegisFormOpen} onCancel={closeForm} footer={null}>
        <RegisterPage showLoginForm={showLoginForm} closeForm={closeForm} />
      </Modal>
    </>
  );
}

export default HomePageHeader;
