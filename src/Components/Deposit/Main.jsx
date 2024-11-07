import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import axios from "axios";
import { Link } from "react-router-dom"; // Add this for linking
import { API } from "../../utils/apiUrl";
import { useSelector } from "react-redux";
import Deposit from "./Deposit";

const DepositMain = () => {
  const [deposit, setDeposit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user)
  const fetchData = async (access_token) => {
    setLoading(true);
    try {
      const getData = await axios.get(`${API}/deposit`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      });
      if (getData.data) {
        setDeposit(getData.data.data);
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
  const onUpdate = () => {
    fetchData(user.access_token);
  };
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
              <Deposit deposit={deposit} onUpdate={onUpdate} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositMain;