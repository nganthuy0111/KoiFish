import { useState, useEffect } from "react";
import { Form, Image, Input, Upload } from "antd";
import CRUDTemplateManager from "../../components/crud-template-manager/crud-template-manager";
import api from "../../config/axios";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

function ManageTour() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tour Name",
      dataIndex: "tourName",
      key: "tourName",
    },
    {
      title: "Consultant",
      dataIndex: "consultingName",
      key: "consultingName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Farm Name",
      dataIndex: "farms",
      key: "farms",
      render: (farms) => farms.map((farm) => farm.farmName).join(", "),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <Image
            src={image}
            alt="Tour"
            style={{
              width: 100,
              height: 50,
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => {
              setPreviewImage(image);
              setPreviewOpen(true);
            }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        name="tourName"
        label="Tour Name"
        rules={[{ required: true, message: "Please enter the tour name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter the description!" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="image"
        label="Image"
        rules={[{ required: true, message: "Please upload an image!" }]}
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
      >
        <Upload
          listType="picture-card"
          beforeUpload={() => false}
          maxCount={1}
          onPreview={handlePreview}
        >
          {uploadButton}
        </Upload>
      </Form.Item>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );

  const path = "/tour/get/all";

  return (
    <div>
      <CRUDTemplateManager
        columns={columns}
        formItems={formItems}
        path={path}
      />
    </div>
  );
}

export default ManageTour;
