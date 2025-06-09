/* TourManagement.jsx */
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Upload,

} from "antd";
import api from "../../../config/axios";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import moment from "moment";
import CRUDTempleteTour from "../../../components/crud-template/crud-tourtemplete";

const { TextArea } = Input;

function TourManagement() {
  const [farmOptions, setFarmOptions] = useState([]);
  const [consultingOptions, setConsultingOptions] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [consultingLoading, setConsultingLoading] = useState(true);

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

  const fetchConsultingOptions = async (page, pageSize) => {
    try {
      const response = await api.get(`account?page=${page}&size=${pageSize}`);
      const allCustomer = response.data.listData;
      const filteredData = allCustomer.filter(
        (account) => account.role === "CONSULTING"
      );
      setConsultingOptions(
        filteredData.map((account) => ({
          label: account.fullName,
          value: account.id,
        }))
      );
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data || "Failed to fetch data");
    } finally {
      setConsultingLoading(false);
    }
  };

  const fetchFarmOptions = async (page, pageSize) => {
    try {
      const response = await api.get(
        `/farm/guest/get?page=${page}&size=${pageSize}`
      );
      console.log(response);

      setFarmOptions(
        response.data.listData.map((farms) => ({
          label: farms.farmName,
          value: farms.id,
        }))
      );
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data || "Failed to fetch farms");
    }
  };

  useEffect(() => {
    fetchFarmOptions(0, 10);
    fetchConsultingOptions(0,10);
  }, []);

  const timeOptions = [
    { label: "8:00 AM", value: "08:00" },
    { label: "11:00 AM", value: "11:00"},
    { label: "2:00 PM", value: "02:00" },
    { label: "5:00 PM", value: "05:00" },
  ];

  const durationOptions = [
    { label: "2 Days", value: "2 days" },
    { label: "3 Days", value: "3 days" },
    { label: "4 Days", value: "4 days" },
    { label: "5 Days", value: "5 days" },
  ];
  const columns = [
    {
      title: "Tour ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tour Name",
      dataIndex: "tourName",
      key: "tourName",
    },
    {
      title: "Consulting Name",
      dataIndex: "consultingName",
      key: "consultingName",

      render: (consultingName) => <span>{consultingName || "Unknown"}</span>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => moment(startDate).format("YYYY/MM/DD"),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (time) => moment(time, "HH:mm").isValid() ? moment(time, "HH:mm").format("HH:mm") : "Invalid time",
    },    

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => <span>{description}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    },
    {
      title: "Adult's Price",
      dataIndex: "perAdultPrice",
      key: "perAdultPrice",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    },
    {
      title: "Child's Price",
      dataIndex: "perChildrenPrice",
      key: "perChildrenPrice",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Farm" style={{ width: 100, height: 50 }} />
      ),
    },
    {
      title: "Farm Name",
      dataIndex: "farms",
      key: "farmName",
      render: (farms) =>
        farms && Array.isArray(farms)
          ? farms.map((farm) => farm.farmName).join(", ")
          : "No farm",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        name="tourName"
        label="Tour Name"
        rules={[{ required: true, message: "Please enter the Tour Name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter the description!" }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="consultingId"
        label="Consultant"
        rules={[{ required: true, message: "Please select a Consulting!" }]}
      >
        <Select
          loading={consultingLoading}
          options={consultingOptions}
          placeholder="Select a Consulting"
          notFoundContent={
            consultingLoading ? "Loading..." : "No consultings found"
          }
        />
      </Form.Item>
      <Form.Item
        name="farmId"
        label="Farm"
        rules={[{ required: true, message: "Please select a Farm!" }]}
      >
        <Select
          mode="multiple"
          options={farmOptions}
          placeholder="Select a farm"
          notFoundContent={farmOptions.length === 0 ? "Loading..." : null}
        />
      </Form.Item>
      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[{ required: true, message: "Please select a Start Date!" }]}
      >
        <DatePicker format={"YYYY/MM/DD"} />
      </Form.Item>
      <Form.Item
        name="duration"
        label="Duration"
        rules={[{ required: true, message: "Please select a duration!" }]}
      >
        <Select options={durationOptions} placeholder="Select duration" />
      </Form.Item>
      <Form.Item
        name="time"
        label="Time"
        rules={[{ required: true, message: "Please select a Time!" }]}
      >
      <Select options={timeOptions} placeholder="Select time" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter the Price!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="perAdultPrice"
        label="Per Adult Price"
        rules={[{ required: true, message: "Please enter the price of adult!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="perChildrenPrice"
        label="Per Child Price"
        rules={[{ required: true, message: "Please enter the price of child!" }]}
      >
        <InputNumber />
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

  return (
    <div>
      <CRUDTempleteTour columns={columns} formItems={formItems} path="tour"/>
    </div>
  );
}

export default TourManagement;
