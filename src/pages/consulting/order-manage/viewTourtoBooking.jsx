
import { useEffect, useState } from "react";
import moment from "moment";
import { Button, Table } from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function ViewTourToBooking() {
  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1, // current page
    pageSize: 6, // page size
    total: 0,
  });
  const navigate = useNavigate();
  const fetchData = async (page, pageSize) => {
    try {
      const response = await api.get(
        `tour/get/all?page=${page - 1}&size=${pageSize}`
      );
      const { listData, totalElements } = response.data;
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
  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex:"id",
      key: 'id',
    },
    {
      title: 'Tour ID',
      dataIndex:"tourId",
      key: 'tourId',
    },
    {
      title: 'Tour Name',
      dataIndex:"tourName",
      key: 'tourName',
    },  
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => moment(startDate).format("YYYY/MM/DD"),
    },
    {
      title: 'Status',
      dataIndex:"status",
      key: 'status',
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            disabled={record.deleted}
            onClick={() => handleViewBooking(record.id)}
          >
            View Booking
          </Button>
        </>
      ),
    },
  ]
  const handleViewBooking = (id) => {
    navigate(`/consulting/booking?page=0&size=${pagination.pageSize}&id=${id}`);
  };
  return (
    <div>
        <Table
        dataSource={datas}
        columns={columns}
        pagination={pagination}
        rowKey="id"
      />  
    </div>
  )
}

export default ViewTourToBooking;
