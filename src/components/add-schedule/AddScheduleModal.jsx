import React, { useState } from "react";
import { Modal, Form, Input, message, Button, Upload, Image } from "antd";
import api from "../../config/axios";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import uploadFile from "../../utils/file";
import { toast } from "react-toastify";

const AddScheduleModal = ({ visible, onClose, booking }) => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file) => {
    let preview = file.url || file.preview;
    if (!file.url && !file.preview) {
      preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleSubmitSchedule = async (values) => {
    console.log(values);
  };

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
      const newSchedule = {
        file: url,
        bookingId: booking.bookingId,
        customBookingId: null,
      };

      console.log(newSchedule);
      try {
        const response = await api.post(`schedule`, newSchedule);
        toast.success("Schedule added successfully");
      } catch (error) {
        console.error("Error adding schedule:", error.message);
      }
    }
  };

  return (
    <Modal
      title="Add Schedule"
      visible={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Upload
        name="image"
        className="upload-button"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Modal>
  );
};

export default AddScheduleModal;
