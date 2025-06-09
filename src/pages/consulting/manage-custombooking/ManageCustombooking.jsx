import { Button, Table } from 'antd'
import React from 'react'
import CRUDCustomBooking from '../../../components/crud-template/crudCustomBooking';

function ManageCustombooking() {
    const columns = [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Create At",
          dataIndex: "createAt",
          key: "createAt",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },  
        {
            title: "Consulting Name",
            dataIndex: "consulting",
            key: "consulting",
            render: (consulting) => <span>{consulting?.fullName}</span>,
          }, 
          {
            title: "Sale Name",
            dataIndex: "account",
            key: "account",
            render: (account) => <span>{account?.fullName}</span>,
          },   
          
             
      ];
  return (
    <div>
           <CRUDCustomBooking columns={columns} path="customBooking/get" />
    </div>
  )
}

export default ManageCustombooking
