import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import axios from "axios";
import { API } from "../../utils/apiUrl";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const AddMoney = () => {
    const [users, setUsers] = useState([]); // State to hold list of users
    const [selectedUser, setSelectedUser] = useState(""); // State to hold the selected user
    const [amount, setAmount] = useState(""); // State to hold the amount to be added
    const [loading, setLoading] = useState(false); // State to handle loading

    // Fetch users when the component loads
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${API}/api/users`);
                setUsers(data); // Assuming the API returns a list of users
            } catch (error) {
                console.error("Error fetching users", error);
                toast.error("Failed to load users", ToastObjects);
            }
        };

        fetchUsers();
    }, []);

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!selectedUser || !amount) {
            toast.error("Please select a user and enter an amount", ToastObjects);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.put(`${API}/api/Waller`, {
                userId: selectedUser,
                amount,
            });
            if (response.data) {
                toast.success("Money added successfully!", ToastObjects);
            }
            else {
                toast.error("Money added fail!", ToastObjects);
            }
            setSelectedUser("");
            setAmount("");
        } catch (error) {
            console.error("Error adding money", error);
            toast.error("Failed to add money", ToastObjects);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={submitHandler}>
                    <div className="content-header">
                        <Link to="/money" className="btn btn-danger text-white">
                            Go to money
                        </Link>
                        <h2 className="content-title">Add money</h2>
                        <div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Publishing..." : "Publish now"}
                            </button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {/* User selection dropdown */}
                                    <div className="mb-4">
                                        <label htmlFor="user_select" className="form-label">
                                            Select User
                                        </label>
                                        <select
                                            id="user_select"
                                            className="form-control"
                                            value={selectedUser}
                                            onChange={(e) => setSelectedUser(e.target.value)}
                                            required
                                        >
                                            <option value="">Select a user</option>
                                            {users.map((user) => (
                                                <option key={user._id} value={user._id}>
                                                    {user.name} ({user.email})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Amount input field */}
                                    <div className="mb-4">
                                        <label htmlFor="amount_input" className="form-label">
                                            Enter Amount
                                        </label>
                                        <input
                                            type="number"
                                            id="amount_input"
                                            className="form-control"
                                            placeholder="Enter amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default AddMoney;
