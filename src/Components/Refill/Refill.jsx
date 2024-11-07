import React, { useState } from "react";
import Table from "../Table/Table";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { API } from "../../utils/apiUrl";

const Refill = (props) => {
    const { deposit, onUpdate, user } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [formData, setFormData] = useState({});

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentRow(null);
        setFormData({});
    };

    const handleDeleteClick = async (rowId) => {
        try {
            await axios.delete(`${API}/refill/${rowId}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            });
            if (onUpdate) onUpdate(); // Refresh the data in parent component
        } catch (error) {
            handleUnauthorizedError(error);
        }
    };

    const handleEditClick = (row) => {
        setCurrentRow(row);
        setFormData(row); // Set form data with current row data
        setIsModalOpen(true); // Open the edit modal
    };

    const handleUnauthorizedError = (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized access - clearing store and redirecting.");
            alert("Session expired. Please log in again.");
            localStorage.clear();
            window.location.href = "/login";
        } else {
            console.error("Error:", error);
        }
    };

    const handleSave = async () => {
        try {
            await axios.patch(`${API}/refill/${currentRow._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            });
            if (onUpdate) onUpdate(); // Refresh the data in parent component after update
            handleCloseModal(); // Close the modal
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized access - clearing store and redirecting.");
                alert("Session expired. Please log in again.");

                // Xóa dữ liệu trong store
                localStorage.clear();

                window.location.href = "/login";
            }
            alert(error.message)
            handleUnauthorizedError(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row._id,
        },
        {
            name: "User ID",
            selector: (row) => row.user,
            sortable: true,
        },
        {
            name: "Order Id",
            selector: (row) => row.orderId,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status ? "Đã duyệt" : "Chưa duyệt",
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
                    {/* <button
                        className="btn btn-danger"
                        style={{ marginLeft: "15px" }}
                        onClick={() => handleDeleteClick(row._id)}
                    >
                        Delete
                    </button> */}
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                data={deposit}
                columns={columns}
                sub={true}
            />

            {/* Edit Modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Edit Data</DialogTitle>
                <DialogContent>
                    <TextField
                        label="User ID"
                        name="user"
                        value={formData.user || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Order ID"
                        name="orderId"
                        value={formData.orderId || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />

                    {/* Select for Status */}
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={formData.status ? "true" : "false"}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                status: e.target.value === "true" // Convert string to boolean
                            }))}
                            label="Status"
                        >
                            <MenuItem value="true">Đã duyệt</MenuItem>
                            <MenuItem value="false">Chưa duyệt</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Refill;
