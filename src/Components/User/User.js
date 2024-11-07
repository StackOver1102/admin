import React from "react";
import Table from "../Table/Table";
import { Link } from "react-router-dom";

const Users = (props) => {
    const { users } = props;
    console.log("🚀 ~ Users ~ users:", users)

    const columns = [
        {
            name: "ID",
            selector: (row) => row._id
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email
        },
        {
            name: "Role",
            selector: (row) => row.isAdmin ? "admin" : "user",
        },
        {
            name: "Api Key",
            selector: (row) => row.apiKey
        },
        {
            name: "Is Band",
            selector: (row) => row.isBand ? "true" : "false"
        },
        {
            name: "Money",
            selector: (row) => row.money
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="d-flex item-center">
                    <Link
                        to={`/users/${row._id}/edit`}
                    // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                    >
                        <button className="btn btn-primary">Edit</button>
                    </Link>
                    <Link
                        style={{ marginLeft: "15px" }}
                        // onClick={() => handleDelete(row._id)}
                    // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                    >
                        <button className="btn btn-primary">Delete</button>
                    </Link>
                </div>

            ),
        },
    ]
    return (
        <Table data={users} columns={columns} />

    );
};

export default Users;