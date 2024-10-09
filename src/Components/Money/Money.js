import React from "react";
import Table from "../Table/Table";
import { formatToVND } from "../../utils/formatMoney";

const Money = (props) => {
    const { pay } = props;
 
    const columns = [
        {
            name: "ID",
            selector: (row) => row._id
        },
        {
            name: "Balance",
            selector: (row) => formatToVND(row.balance),
            sortable: true,
        },
        {
            name: "Id User",
            selector: (row) => row.user._id
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

export default Money;