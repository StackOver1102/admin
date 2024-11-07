import React from "react";
import Table from "../Table/Table";
import { formatToVND } from "../../utils/formatMoney";
import { Tooltip } from "@mui/material";

const Money = (props) => {
    const { pay } = props;

    const columns = [
        {
            name: "ID",
            selector: (row) => row._id
        },
        {
            name: "Code",
            selector: (row) => row.request_id,
            sortable: true,
        },
        {
            name: "Request ID",
            selector: (row) => row.code,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Amount",
            selector: (row) => formatToVND(row.amount),
            sortable: true,
        },
        {
            name: "Currency",
            selector: (row) => "VND",
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => (
                <Tooltip title={row.description} placement="top">
                    <span className="ellipsis-text">{row.description}</span>
                </Tooltip>
            ),
            sortable: true,
        },
        {
            name: "Date",
            // selector: (row) => new Date(row.createdAt).toLocaleString(),
            selector: (row) => (
                <Tooltip title={new Date(row.createdAt).toLocaleString()} placement="top">
                    <span className="ellipsis-text">{new Date(row.createdAt).toLocaleString()}</span>
                </Tooltip>
            ),
            sortable: true,
        },
    ]
    return (
        <Table data={pay} columns={columns} />

    );
};

export default Money;