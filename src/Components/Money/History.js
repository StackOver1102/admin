import React from "react";
import Table from "../Table/Table";
import { formatToVND } from "../../utils/formatMoney";

const HistoryMoney = (props) => {
    const { pay } = props;
 
    const columns = [
        {
            name: "ID",
            selector: (row) => row._id
        },
        {
            name: "Số tiền nạp",
            selector: (row) => formatToVND(row.balance) || 0,
            sortable: true,
        },
        {
            name: "Số tiền cũ",
            selector: (row) => formatToVND(row.balanceOld) || 0,
            sortable: true,
        },
        {
            name: "Số tiền mới",
            selector: (row) => formatToVND(row.balanceNew) || 0,
            sortable: true,
        },
        {
            name: "User Name",
            selector: (row) => row.user.name
        },
    ]
    return (
        <Table data={pay} columns={columns} />

    );
};

export default HistoryMoney;