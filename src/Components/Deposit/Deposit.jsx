import React, { useState } from "react";
import Table from "../Table/Table";
import { Tooltip, Box } from "@mui/material";
import CustomModal from "../Modelv2/Model";
import axios from "axios";
import { API } from "../../utils/apiUrl";

const Deposit = (props) => {
    const { deposit, onUpdate } = props; // Pass a function to update local state after edit/delete

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentRow(null);
    };

    const handleDeleteClick = async (rowId) => {
        try {
            await axios.delete(`${API}/deposit/${rowId}`);
            console.log("Deleted row with ID:", rowId);
            if (onUpdate) onUpdate(); // Refresh the data in parent component
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized access - clearing store and redirecting.");
                alert("Session expired. Please log in again.");

                // Xóa dữ liệu trong store
                localStorage.clear();

                window.location.href = "/login";
            }
            console.error("Error deleting row:", error);
        }
    };

    const handleEditClick = (row) => {
        setCurrentRow(row);
        setIsModalOpen(true); // Open edit modal
    };

    const onSave = async (updatedData, access_token) => {
        try {
            const response = await axios.patch(`${API}/deposit/${currentRow._id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });

            if (onUpdate) onUpdate(); // Refresh the data in parent component after update
            handleCloseModal(); // Close the modal
            // window.reload
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized access - clearing store and redirecting.");
                alert("Session expired. Please log in again.");

                // Xóa dữ liệu trong store
                localStorage.clear();

                window.location.href = "/login";
            }
            console.error("Error updating data:", error);
        }
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row._id,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Active",
            selector: (row) => (row.active ? "Hoạt động" : "Không hoạt động"),
            sortable: true,
        },
        {
            name: "Key",
            selector: (row) => (
                <Tooltip title={row.key} placement="top">
                    <span className="ellipsis-text">{row.key}</span>
                </Tooltip>
            ),
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleEditClick(row)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger"
                        style={{ marginLeft: "15px" }}
                        onClick={() => handleDeleteClick(row._id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const ExpandedDataRow = ({ data }) => (
        <Box sx={{ padding: 2, backgroundColor: "#f9f9f9" }}>
            <p>
                <strong>Additional Data:</strong> {JSON.stringify(data.value)}
            </p>
        </Box>
    );

    return (
        <>
            <Table
                data={deposit}
                columns={columns}
                sub={true}
                expandableRows={true}
                expandableRowsComponent={ExpandedDataRow}
            />
            {isModalOpen && (
                <CustomModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    data={currentRow} // Pass the current row's data to the modal for editing
                    onSave={onSave} // Pass the onSave function to handle saving
                />
            )}
        </>
    );
};

export default Deposit;
