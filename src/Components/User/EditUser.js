import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../utils/apiUrl";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditUsers = ({ id }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
    isBand: false,
  });

  // Fetch user details by id
  const getDetailUsers = async (id) => {
    if (!id) {
      console.log("Invalid ID");
      return;
    }
    setLoading(true); // Set loading state to true before API call
    try {
      const result = await axios.get(`${API}/api/users/${id}`);
      if (result.data) {
        console.log("🚀 ~ getDetailUsers ~ result.data:", result.data)
        setUser(result.data);
        setFormData({
          name: result.data.name,
          email: result.data.email,
          isAdmin: result.data.isAdmin,
          isBand: result.data.isBand,
        });
      } else {
        console.log("No user found");
      }
    } catch (error) {
      console.log("Error fetching user details:", error);
      setError("Error fetching user details");
    } finally {
      setLoading(false); // Set loading state to false after API call
    }
  };

  // Fetch user details when the component mounts or when the id changes
  useEffect(() => {
    if (id) {
      getDetailUsers(id);
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If checkbox, use checked value; otherwise, use input value
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${API}/api/users/${id}`, formData);
      if (response.data) {
        toast.success("User updated successfully!", ToastObjects);
      }
    } catch (error) {
      console.log("Error updating user:", error);
      toast.error("Failed to update user", ToastObjects);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Go to users
            </Link>
            <h2 className="content-title">Update User</h2>
            <div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Edit now"}
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {/* {error && <Message variant="alert-danger">{error}</Message>} */}

                  {/* Name field */}
                  <div className="mb-4">
                    <label htmlFor="user_name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter user's name"
                      className="form-control"
                      id="user_name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div className="mb-4">
                    <label htmlFor="user_email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter user's email"
                      className="form-control"
                      id="user_email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* isAdmin checkbox */}
                  <div className="mb-4 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="user_isAdmin"
                      name="isAdmin"
                      checked={formData.isAdmin}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="user_isAdmin">
                      Is Admin
                    </label>
                  </div>

                  {/* isBand checkbox */}
                  <div className="mb-4 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="user_isBand"
                      name="isBand"
                      checked={formData.isBand}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="user_isBand">
                      Is Band
                    </label>
                  </div>

                  {/* Add more fields as needed */}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditUsers;
