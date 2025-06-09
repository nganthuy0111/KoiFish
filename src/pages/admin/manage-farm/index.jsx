import { Button, Form, Image, Input, Upload } from "antd";
import CRUDTemplate from "../../../components/crud-template/crud-template";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

function FarmManagement() {
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
    <Button
      type="button"
      icon={<PlusOutlined />}
      style={{ border: 0, background: "none" }}
    >
      <div style={{ marginTop: 8 }}>Upload</div>
    </Button>
  );
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Farm Name",
      dataIndex: "farmName",
      key: "farmName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <Image
            src={image}
            alt="Koi fish"
            style={{ width: 100, height: 50 }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Image 1",
      dataIndex: "image1",
      key: "image1",
      render: (image1) =>
        image1 ? (
          <Image
            src={image1}
            alt="Image 1"
            style={{ width: 100, height: 50 }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Image 2",
      dataIndex: "image2",
      key: "image2",
      render: (image2) =>
        image2 ? (
          <Image
            src={image2}
            alt="Image 2"
            style={{ width: 100, height: 50 }}
          />
        ) : (
          "No Image"
        ),
    },
  ];

  const formItems = (
    <>
      <Form.Item
        name="farmName"
        label="Farm Name"
        rules={[
          { required: true, message: "Please input the farm'S name!" },
          { min: 2, message: "Name must be at least 2 characters!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="location" label="Location">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item name="owner" label="Owner">
        <Input />
      </Form.Item>
      <Form.Item
        name="image"
        label="Image"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        rules={[{ required: true, message: "Please upload an image!" }]}
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
      <Form.Item
        name="image1"
        label="Image 1"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        rules={[{ required: true, message: "Please upload Image 1!" }]}
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
      <Form.Item
        name="image2"
        label="Image 2"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        rules={[{ required: true, message: "Please upload Image 2!" }]}
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

  return (
    <div>
      <CRUDTemplate columns={columns} formItems={formItems} path="farm" />
    </div>
  );
}
export default FarmManagement;
