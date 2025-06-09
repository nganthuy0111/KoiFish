/* CRUDTemplate.jsx */
import { Table,  } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";


function CRUDBooking({ columns, formItems, path, afterAddItem }) {
  const [datas, setDatas] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1, // current page
    pageSize: 6, // page size
    total: 0,
  });
//

  const tableColumn = [
    ...columns,
  ];

  const fetchData = async (page, pageSize) => {
    try {
      const response = await api.get(`${path}?page=${page - 1}&size=${pageSize}`);
      const { listData, totalElements } = response.data;

      setDatas(listData || response.data.listData);
      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
      console.log(listData);
    } catch (err) {
      console.error("Error fetching data ", err);
      toast.error(err.response?.data?.message || err.message || "Error occurred");
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize); 
  }, []);

  return (
    <div>
      <div>
        <Table
          dataSource={datas}
          columns={tableColumn}
          pagination={pagination}
          rowKey="id"
        />      
      </div>
      
    </div>
  );
}

export default CRUDBooking;
