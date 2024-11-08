import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import Money from "./Money";
import axios from "axios";
import { Link } from "react-router-dom"; // Add this for linking
import { API } from "../../utils/apiUrl";
import { useSelector } from "react-redux";

const PayMain = () => {
  const [pay, setPay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user)
  const fetchData = async (access_token) => {
    setLoading(true);
    try {
      const getData = await axios.get(`${API}/invoice`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      });
      if (getData.data) {
        setPay(getData.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - clearing store and redirecting.");
        alert("Session expired. Please log in again.");

        // Xóa dữ liệu trong store
        localStorage.clear();

        window.location.href = "/login";
      }
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    if (user.access_token) {
      fetchData(user.access_token);
    }
  }, [user]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">History Invoice</h2>
        {/* Add "Create New" button */}
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Money pay={pay} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayMain;
