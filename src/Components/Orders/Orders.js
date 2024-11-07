import React, { useState } from "react";
import Table from "../Table/Table";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { API } from "../../utils/apiUrl";
import { useSelector } from "react-redux";
import axios from "axios";

const Orders = (props) => {
    const { orders } = props;

    // Trạng thái để quản lý modal và thông tin đơn hàng được chỉnh sửa
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        status: ""
    });
    const user = useSelector((state) => state.user)

    // Hàm mở modal và thiết lập đơn hàng được chọn
    const handleEdit = (order) => {
        setSelectedOrder(order);
        setFormData({
            id: order._id,
            status: order.orderStatus,
        });
        setShowModal(true);
    };

    // Hàm đóng modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    // Hàm xử lý khi thay đổi dữ liệu trong input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const sendUpdate = async (id, access_token, data) => {
        try {
            const response = await axios.put(`${API}/orders/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });

            // Xử lý phản hồi thành công
            if (response.status === 200) {
                console.log("Update successful:", response.data);
                return response.data; // Trả về dữ liệu để sử dụng sau này nếu cần
            } else {
                console.log("Update completed but with unexpected status:", response.status);
            }

        } catch (error) {
            // Xử lý lỗi
            console.error("Failed to update product:", error.response ? error.response.data : error.message);
        }
    };

    // Hàm xử lý khi lưu thay đổi
    const handleSaveChanges = async () => {
        try {
            const { id } = formData;
            const data = { ...formData };  // Tạo bản sao từ formData để cập nhật
            const response = await sendUpdate(id, user.access_token, data);
    
            // Kiểm tra phản hồi để xác định xem cập nhật thành công hay không
            if (response) {
                console.log("Update successful", response);
                alert("Update successful")
                window.location.reload();
                // Có thể thêm thông báo cho người dùng tại đây
            } else {
                console.log("Update completed with no response data.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized access - clearing store and redirecting.");
                alert("Session expired. Please log in again.");
                
                // Xóa dữ liệu trong store
                localStorage.clear();
    
                // Điều hướng đến trang đăng nhập hoặc trang chủ
                window.location.href = "/login";
            } else {
                console.error("Failed to save changes:", error);
                alert("Failed to update");
            }
        } finally {
            closeModal();
        }
    };
    

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
            selector: (row) => row.orderItems.service
        },
        {
            name: "Quality",
            selector: (row) => row.orderItems.quantity,
        },
        {
            name: "Link",
            selector: (row) => row.orderItems.link
        },
        {
            name: "Total Price",
            selector: (row) => row.totalPrice
        },
        {
            name: "Status",
            selector: (row) => row.orderStatus
        },
        {
            name: "Ngày tạo",
            selector: (row) => new Date(row.createdAt).toLocaleString()
        },
        {
            name: "Edit",
            selector: (row) => (
                <div className="d-flex item-center">
                    <button className="btn btn-primary" onClick={() => handleEdit(row)}>
                        Edit
                    </button>
                    {/* <button
                        className="btn btn-danger"
                        style={{ marginLeft: "15px" }}
                    >
                        Delete
                    </button> */}
                </div>
            ),
        }
    ];

    return (
        <>
            <Table data={orders} columns={columns} />

            {/* Modal Bootstrap */}
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="totalPrice"
                                value={formData.totalPrice}
                                onChange={handleChange}
                            />
                        </Form.Group> */}
                        <Form.Group className="mb-3">
                            <Form.Label>Order Status</Form.Label>
                            <Form.Select
                                name="orderStatus"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                {/* export enum Status { */}
                                {/* 'Pending' = 'Chờ duyệt',
  'Processing' = 'Đang kiểm tra',
  'In Progress' = 'Đang tiến hành',
  'Completed' = 'Hoàn thành',
  'Partial' = 'Đã chạy một phần',
  'Canceled' = 'Bị hủy', */}
                                {/* } */}
                                <option value="Pending">Pending</option>
                                <option value="Đang kiểm tra">Processing</option>
                                <option value="Đang tiến hành">In Progress</option>
                                <option value="Hoàn thành">Completed</option>
                                <option value="Đã chạy một phần">Partial</option>
                                <option value="Bị hủy">Canceled</option>

                            </Form.Select>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Orders;
