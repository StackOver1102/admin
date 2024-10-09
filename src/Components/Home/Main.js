import React, { useEffect, useState } from "react";
import TopTotal from "./TopTotal";
import SaleStatistics from "./SalesStatistic";
import ProductsStatistics from "./ProductsStatistics";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API } from "../../utils/apiUrl";
import TopOrder from "./LasterOrder";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState(null); // Initialize state to hold the API data
  const [error, setError] = useState(null); // State to track any errors

  // Function to fetch data from API
  const handleGetAll = async () => {
    try {
      const result = await axios.get(`${API}/report`); // Replace `${API}` with your actual API URL
      setData(result.data); // Set the fetched data to state
    } catch (error) {
      setError(error.message); // Handle and store the error in state
    }
  };
  useEffect(() => {
    handleGetAll();
  }, []);
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal totalSale={data?.totalYearRevenue} orderCount={data?.orderCount} productCount={data?.serviceCount} />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics totalRevenueByOrigin={data?.totalRevenueByOrigin || []} />
          <ProductsStatistics totalRevenueByMonth={data?.totalRevenueByMonth || []} />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <TopOrder data={data?.topOrders} />
        </div>
      </section>
    </>
  );
};

export default Main;
