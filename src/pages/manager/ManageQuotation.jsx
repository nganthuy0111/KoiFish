import { Table, Button, Modal, Descriptions, Input } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

function ManageQuotation() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [note, setNote] = useState("");
  const [actionType, setActionType] = useState(""); // "approve" or "cancel"
  const [currentQuotationId, setCurrentQuotationId] = useState(null);

  const fetchData = async (
    page = pagination.current,
    pageSize = pagination.pageSize
  ) => {
    try {
      setLoading(true);
      const response = await api.get("quotation/pending", {
        params: {
          page: page - 1,
          size: pageSize,
        },
      });
      console.log("API Response:", response.data);
      const { listData, totalElements } = response.data;
      setDatas(listData);
      setPagination((prev) => ({
        ...prev,
        total: totalElements,
        current: page,
        pageSize,
      }));
    } catch (err) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination) => {
    if (newPagination.pageSize !== pagination.pageSize) {
      fetchData(1, newPagination.pageSize);
    } else {
      fetchData(newPagination.current, newPagination.pageSize);
    }
  };

  const handleViewDetails = async (quotationId) => {
    try {
      const response = await api.get(`quotation/bookingCode?id=${quotationId}`);
      setSelectedBooking(response.data);
      setShowModal(true);
    } catch (err) {
      toast.error("Error fetching booking details");
    }
  };

  const handleActionClick = (type, quotationId) => {
    setActionType(type);
    setCurrentQuotationId(quotationId);
    setShowNoteModal(true);
  };

  const handleNoteSubmit = async () => {
    try {
      const url =
        actionType === "approve"
          ? `quotation/approve?note=${note}&id=${currentQuotationId}`
          : `quotation/cancel?note=${note}&id=${currentQuotationId}`;
      await api.post(url);
      toast.success(
        `${actionType === "approve" ? "Approved" : "Cancelled"} successfully`
      );
      setShowNoteModal(false);
      setNote("");
      fetchData();
    } catch (err) {
      toast.error("Error processing action");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Quotation ID",
      dataIndex: "quotationId",
      key: "quotationId",
    },
    {
      title: "Adult Price",
      dataIndex: "adultPrice",
      key: "adultPrice",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    },
    {
      title: "Child Price",
      dataIndex: "childPrice",
      key: "childPrice",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => `${value.toLocaleString("en-US")} VND`,

    },
    {
      title: "Pending Approval",
      key: "status",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleActionClick("approve", record.quotationId)}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => handleActionClick("cancel", record.quotationId)}
          >
            Cancel
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Table
        dataSource={datas}
        columns={columns}
        rowKey="quotationId"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <Modal
        title="Booking Details"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={1100}
      >
        {selectedBooking && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Booking ID" span={1}>
              {selectedBooking.bookingId}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={1}>
              {selectedBooking.status}
            </Descriptions.Item>
            <Descriptions.Item label="Price" span={1}>
              {selectedBooking.price}
            </Descriptions.Item>
            <Descriptions.Item label="Booking Date" span={1}>
              {new Date(selectedBooking.bookingDate).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Customer Name" span={1}>
              {selectedBooking.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Phone" span={1}>
              {selectedBooking.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Adult" span={1}>
              {selectedBooking.adult}
            </Descriptions.Item>
            <Descriptions.Item label="Child" span={1}>
              {selectedBooking.child}
            </Descriptions.Item>
            <Descriptions.Item label="Infant" span={1}>
              {selectedBooking.infant}
            </Descriptions.Item>
            <Descriptions.Item label="Sale Name" span={1}>
              {selectedBooking.account?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Tour Name" span={2}>
              {selectedBooking.tour?.tourName}
            </Descriptions.Item>
            <Descriptions.Item label="Farms" span={2}>
              {selectedBooking.tour?.farms?.map((farm) => (
                <div key={farm.farmId} style={{ marginBottom: "10px" }}>
                  <p>
                    <strong>Farm Name:</strong> {farm.farmName}
                  </p>
                  <p>
                    <strong>Location:</strong> {farm.location}
                  </p>
                </div>
              ))}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title={`Enter Note for ${
          actionType === "approve" ? "Approval" : "Cancellation"
        }`}
        visible={showNoteModal}
        onOk={handleNoteSubmit}
        onCancel={() => setShowNoteModal(false)}
      >
        <Input.TextArea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter your note here"
          rows={4}
        />
      </Modal>
    </div>
  );
}

export default ManageQuotation;
