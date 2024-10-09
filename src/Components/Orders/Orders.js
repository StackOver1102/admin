import React from "react";
import Table from "../Table/Table";

const Orders = (props) => {
    const { orders } = props;

    const columns = [
        {
            name: "ID",
            selector: (row) => row._id
        },
        {
            name: "ID User",
            selector: (row) => row.user,
            sortable: true,
        },
        {
            name: "Service",
            selector: (row) => row.orderItems[0].service
        },
        {
            name: "Quality",
            selector: (row) => row.orderItems[0].quantity,
        },
        {
            name: "Link",
            selector: (row) => row.orderItems[0].link
        },
        {
            name: "Total Price",
            selector: (row) => row.totalPrice
        }, {
            name: "Status",
            selector: (row) => row.orderStatus
        },
        {
            name: "Ngày tạo",
            selector: (row) =>  new Date(row.createdAt).toLocaleString()
        }
    ]
    return (
        <Table data={orders} columns={columns} />

    );
};

export default Orders;