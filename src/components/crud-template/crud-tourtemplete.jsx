/* CRUDTemplate.jsx */
import { Button, Form, Input, Modal, Table, Switch } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import uploadFile from "../../utils/file";
import moment from "moment"; // Thêm import moment

function CRUDTempleteTour({ columns, formItems, path, afterAddItem }) {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1, // current page
    pageSize: 6, // page size
    total: 0,
  });

  // Hàm edit để cập nhật dữ liệu
  const edit = async (id, dataToUpdate) => {
    try {
      // Kiểm tra và tách breedId và farmId nếu có
      let finalData = { ...dataToUpdate };
      if (finalData.breed && finalData.breed.id) {
        finalData.breedId = finalData.breed.id;
        delete finalData.breed;
      }
      if (finalData.farm && finalData.farm.id) {
        finalData.farmId = finalData.farm.id;
        delete finalData.farm;
      }

      const updatedData = await api.put(`${path}/${id}`, finalData);
      const newData = datas.map((item) =>
        item.id === updatedData.data.id ? updatedData.data : item
      );
      setDatas(newData);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Error occurred"
      );
    }
  };

  const handleSwitchChange = async (checked, id) => {
    try {
      const currentData = datas.find((item) => item.id === id);
      // Tạo dữ liệu cập nhật
      const dataToUpdate = {
        ...currentData,
        deleted: !checked,
      };
      // Kiểm tra và tách breedId và farmId nếu có
      let finalData = { ...dataToUpdate };
      if (finalData.breed && finalData.breed.id) {
        finalData.breedId = finalData.breed.id;
        delete finalData.breed;
      }
      if (finalData.farm && finalData.farm.id) {
        finalData.farmId = finalData.farm.id;
        delete finalData.farm;
      }
      await edit(id, finalData);
      const newData = datas.map((item) =>
        item.id === id ? { ...item, deleted: !checked } : item
      );
      setDatas(newData);
      toast.success(checked ? "Enable data" : "Disable data");
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Error occurred"
      );
    }
  };

  const tableColumn = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              const data = { ...record };
              if (record.startDate) {
                data.startDate = moment(record.startDate);
              }
              // if (record.time) {
              //   data.time = moment(record.time,"HH:mm");
              // }
              if (record.image) {
                data.image = [
                  {
                    uid: "-1",
                    name: "image.png",
                    status: "done",
                    url: record.image,
                  },
                ];
              }
              form.setFieldsValue(data);
            }}
            style={{ marginRight: 8 }}
            disabled={record.deleted}
          >
            Edit
          </Button>
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => (
        <Switch
          checked={!record.deleted} // Kiểm tra trạng thái, bật/tắt switch
          onChange={(checked) => handleSwitchChange(checked, record.id)} // Xử lý bật/tắt
        />
      ),
    },
  ];

  // Fetch paginated data
  const fetchData = async (page, pageSize) => {
    try {
      const response = await api.get(
        `${path}/get/all?page=${page - 1}&size=${pageSize}`
      );

      // Lấy dữ liệu từ API
      const { listData, totalElements } = response.data;

      // Không lọc theo trạng thái `deleted`, hiển thị tất cả dữ liệu
      setDatas(listData || response.data);
      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
      console.log(listData);
    } catch (err) {
      console.error("Error fetching data CRUD:", err);
      toast.error(
        err.response?.data?.message || err.message || "Error occurred"
      );
    }
  };

  // CREATE OR UPDATE
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const dataToSend = { ...values };
      console.log("Time before formatting:", dataToSend.time);

      console.log(dataToSend);
      if (dataToSend.time) {
        console.log("Time before formatting:", dataToSend.time);
        if (moment.isMoment(dataToSend.time)) {
          dataToSend.time = dataToSend.time.format("HH:mm");
        } else {
          const m = moment(dataToSend.time, "HH:mm");
          console.log("Parsed time:", m.format("HH:mm"));
          if (m.isValid()) {
            dataToSend.time = m.format("HH:mm");
          } else {
            dataToSend.time = null;
          }
        }
        console.log("Time after formatting:", dataToSend.time);
      }

      // Xử lý upload hình ảnh
      if (dataToSend.image && dataToSend.image.length > 0) {
        const file = dataToSend.image[0];

        if (file.originFileObj) {
          // File mới cần upload
          const imageUrl = await uploadFile(file.originFileObj);
          dataToSend.image = imageUrl;
        } else if (file.url) {
          // Sử dụng URL của file đã tồn tại
          dataToSend.image = file.url;
        } else {
          dataToSend.image = null;
        }
      } else {
        dataToSend.image = null;
      }

      // Kiểm tra và tách breedId và farmId nếu có
      if (dataToSend.breed && dataToSend.breed.id) {
        dataToSend.breedId = dataToSend.breed.id;
        delete dataToSend.breed;
      }
      if (dataToSend.farm && dataToSend.farm.id) {
        dataToSend.farmId = dataToSend.farm.id;
        delete dataToSend.farm;
      }

      // Loại bỏ id nếu nó là 0 hoặc không cần thiết khi tạo mới
      if (!dataToSend.id || dataToSend.id === 0) {
        delete dataToSend.id;
      }

      let updatedData;
      if (dataToSend.id) {
        // Update existing item
        updatedData = await api.put(`${path}/${dataToSend.id}`, dataToSend);
        const newData = datas.map((item) =>
          item.id === updatedData.data.id ? updatedData.data : item
        );
        setDatas(newData);
      } else {
        // Create new item
        updatedData = await api.post(path, dataToSend);
        setDatas([...datas, updatedData.data]);

        // Gọi hàm sau khi thêm item nếu có
        if (afterAddItem) {
          afterAddItem();
        }
      }

      toast.success("Saved Successfully!");
      form.resetFields();
      setShowModal(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle table change (pagination)
  const handleTableChange = (pagination) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total,
    });
    fetchData(pagination.current, pagination.pageSize); // Fetch new page data
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize); // Initial fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusCircleFilled />}
        style={{
          backgroundColor: "",
          borderRadius: "50px",
          marginBottom: "20px",
        }}
        onClick={() => {
          form.resetFields(); // Reset form khi thêm mới
          setShowModal(true);
        }}
      >
        Add New
      </Button>

      <Table
        dataSource={datas}
        columns={tableColumn}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
      />
      <Modal
        confirmLoading={loading}
        title="Manage Item"
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields(); // Reset form khi đóng modal
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleSubmit}
        >
          {/* Include id field here */}
          <Form.Item name="id" hidden>
            <Input type="hidden" />
          </Form.Item>
          {formItems}
        </Form>
      </Modal>
    </div>
  );
}

export default CRUDTempleteTour;
