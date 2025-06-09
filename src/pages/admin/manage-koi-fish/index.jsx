/* ManageKoiFish.jsx */
import { useState, useEffect } from "react";
import { Form, Image, Input, Select, Upload } from "antd";
import CRUDTemplate from "../../../components/crud-template/crud-template";
import api from "../../../config/axios";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

function ManageKoiFish() {
  const [breedOptions, setBreedOptions] = useState([]);
  const [farmOptions, setFarmOptions] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [breedLoading, setBreedLoading] = useState(true);
  const [farmLoading, setFarmLoading] = useState(true);

  const fetchBreedOptions = async (page, pageSize) => {
    try {
      const response = await api.get(
        `/breed/guest/get?page=${page}&size=${pageSize}`
      );
      const data = response.data;
      const breeds = data.content || data.listData || data;
      setBreedOptions(
        (breeds || []).map((breed) => ({
          label: breed.breedName,
          value: breed.id,
        }))
      );
    } catch (err) {
      toast.error(err.response?.data || "Error fetching breeds");
      console.error("Error fetching breeds:", err);
    } finally {
      setBreedLoading(false);
    }
  };

  const fetchFarmOptions = async (page, pageSize) => {
    try {
      const response = await api.get(
        `/farm/guest/get?page=${page}&size=${pageSize}`
      );
      const data = response.data;
      const farms = data.content || data.listData || data;
      setFarmOptions(
        (farms || []).map((farm) => ({
          label: farm.farmName,
          value: farm.id,
        }))
      );
    } catch (err) {
      toast.error(err.response?.data || "Error fetching farms");
      console.error("Error fetching farms:", err);
    } finally {
      setFarmLoading(false);
    }
  };

  useEffect(() => {
    fetchBreedOptions(0, 100);
    fetchFarmOptions(0, 100);
  }, []);

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
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Breed",
      dataIndex: "breed",
      key: "breed",
      render: (breed) => <span>{breed?.breedName}</span>,
    },
    {
      title: "Farm",
      dataIndex: "farm",
      key: "farm",
      render: (farm) => <span>{farm?.farmName}</span>,
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
  ];

  const formItems = (
    <>
      <Form.Item
        name="breedId"
        label="Breed"
        rules={[{ required: true, message: "Please select a Breed!" }]}
      >
        <Select
          loading={breedLoading}
          options={breedOptions}
          placeholder="Select a breed"
          notFoundContent={breedLoading ? "Loading..." : "No breeds found"}
        />
      </Form.Item>
      <Form.Item
        name="farmId"
        label="Farm"
        rules={[{ required: true, message: "Please select a Farm!" }]}
      >
        <Select
          loading={farmLoading}
          options={farmOptions}
          placeholder="Select a farm"
          notFoundContent={farmLoading ? "Loading..." : "No farms found"}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input Description!" }]}
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

  const path = "/koi";

  return (
    <div>
      <CRUDTemplate columns={columns} formItems={formItems} path={path} />
    </div>
  );
}

export default ManageKoiFish;