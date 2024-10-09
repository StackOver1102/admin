import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import Orders from "./Orders";
import axios from "axios";
import { API } from "../../utils/apiUrl";

const OrderMain = () => {
  const [orders, setOrders] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const getData = await axios.get(`${API}/api/orders`);
      if (getData.data) {
        setOrders(getData.data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter orders based on filter text and date range
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);

    // Check if order matches the text filter (ID User, Service, Status)
    const matchesTextFilter =
      order.user.toLowerCase().includes(filterText.toLowerCase()) ||
      order.orderItems[0].service.toLowerCase().includes(filterText.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(filterText.toLowerCase());

    // Check if order matches the date range filter
    const matchesDateFilter =
      (!startDate || orderDate >= new Date(startDate)) &&
      (!endDate || orderDate <= new Date(endDate));

    return matchesTextFilter && matchesDateFilter;
  });

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="mb-4">
        <div className="row align-items-center">
          {/* Filter Text Input */}
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text" id="search-icon">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Filter by ID User, Service, or Status"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                aria-label="Search"
                aria-describedby="search-icon"
              />
            </div>
          </div>

          {/* Start Date Input */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <label htmlFor="startDate" className="form-label me-2 mb-0">Start Date</label>
              <input
                type="date"
                id="startDate"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          {/* End Date Input */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <label htmlFor="endDate" className="form-label me-2 mb-0">End Date</label>
              <input
                type="date"
                id="endDate"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">

          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={filteredOrders} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
