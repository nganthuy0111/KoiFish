import React, { useEffect, useState } from "react";
import "./Account.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Form, Image, message, Modal, Upload } from "antd";
import { FaCamera, FaPen, FaPhone, FaPhoneAlt } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdOutlineMail, MdOutlinePlace } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../../utils/file";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { updateUser } from "../../../redux/features/userSlice";

function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [userAvatar, setUserAvatar] = useState(user.image);
  const defaultProfileImg = "/image/defaultProfile.png";
  const location = useLocation();
  const [openEditForm, setOpenEditForm] = useState(false);

  const showEditForm = (path) => {
    setOpenEditForm(true);
    navigate(path);
  };

  const closeEditForm = () => {
    setOpenEditForm(false);
    navigate("");
  };

  // Upload user avatar
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = async (info) => {
    if (info.file.status === "done" || info.file.status == "error") {
      const url = await uploadFile(info.file.originFileObj);
      dispatch(updateUser({ field: "image", value: url }));
      setUserAvatar(url);
      const newAccount = {
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        address: user.address,
        image: url,
      };

      try {
        const response = await api.put(`account/${user.id}`, newAccount);
        if (response) {
          toast.success("Change your avatar successfully!");
        } else {
          toast.error("Failed to change your avatar!");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="account-container">
        <div className="profile-information">
          <div className="profile-information-header">
            <span>Profile Settings</span>
          </div>

          <Flex justify="center" style={{ margin: "20px 0" }}>
            <div className="avatar-container">
              <Image
                width={100}
                height={100}
                src={userAvatar}
                onError={() => setUserAvatar(defaultProfileImg)}
                className="user-image"
              />

              <Upload
                name="image"
                className="upload-button"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                <span>
                  <FaCamera />
                </span>
              </Upload>
            </div>
          </Flex>

          <div className="information-container">
            <div className="information-row">
              <div className="information-item">
                <span className="item-title">Full name</span>
                <Button
                  className="edit-button"
                  onClick={() => showEditForm("fullname")}
                >
                  <FaPen />
                </Button>
                <div className="item-content">
                  <span>
                    <LuUser />
                  </span>
                  <span className="detail">{user.fullName}</span>
                </div>
              </div>

              <div className="information-item">
                <span className="item-title">Email address</span>
                <Button
                  className="edit-button"
                  onClick={() => showEditForm("email")}
                >
                  <FaPen />
                </Button>
                <div className="item-content">
                  <span>
                    <MdOutlineMail />
                  </span>
                  <span className="detail">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="information-row">
              <div className="information-item">
                <span className="item-title">Phone number</span>
                <Button
                  className="edit-button"
                  onClick={() => showEditForm("phone")}
                >
                  <FaPen />
                </Button>
                <div className="item-content">
                  <span>
                    <FiPhone />
                  </span>
                  <span className="detail">{user.phone}</span>
                </div>
              </div>

              <div className="information-item">
                <span className="item-title">Password</span>
                <Button
                  className="edit-button"
                  onClick={() => showEditForm("password")}
                >
                  <FaPen />
                </Button>
                <div className="item-content">
                  <span>
                    <CiLock />
                  </span>
                  <span className="detail">**********</span>
                </div>
              </div>
            </div>

            <div className="information-row">
              <div className="information-item" style={{ marginRight: 0 }}>
                <span className="item-title">Address</span>
                <Button
                  className="edit-button"
                  onClick={() => showEditForm("address")}
                >
                  <FaPen />
                </Button>
                <div className="item-content">
                  <span>
                    <MdOutlinePlace />
                  </span>
                  <span className="detail">{user.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit form modal */}
      <Modal open={openEditForm} onCancel={closeEditForm} footer={null}>
        <Outlet key={location.pathname} context={{ closeEditForm }} />
      </Modal>
    </>
  );
}

export default Account;
