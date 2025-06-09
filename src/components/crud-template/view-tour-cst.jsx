/* CRUDTemplate.jsx */
import { Button, Form, Input, Modal, Table, Switch } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";


function ViewTourCST({ columns, path }) {
  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1, // current page
    pageSize: 6, // page size
    total: 0,
  });
  const tableColumn = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            disabled={record.deleted}
          >
            View Booking
          </Button>
        </>
      ),
    },

  ];
  // Fetch paginated data
  const fetchData = async (page, pageSize) => {
    try {
      const response = await api.get(
        `${path}/get/all?page=${page - 1}&size=${pageSize}`
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

  return (
    <div>
      <Table
        dataSource={datas}
        columns={tableColumn}
        pagination={pagination}
        rowKey="id"
      />      
    </div>
  );
}

export default ViewTourCST;
