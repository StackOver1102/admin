import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import axios from "axios";
import { Link } from "react-router-dom"; // Add this for linking
import { API } from "../../utils/apiUrl";
import HistoryMoney from "./History";

const PayMain = () => {
  const [pay, setPay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true); // Start loading before fetching data
    try {
      const getData = await axios.get(`${API}/api/historyMoney`);
      if (getData.data) {
        setPay(getData.data);
      } else {
        setPay([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">History Money</h2>
        {/* Add "Create New" button */}
        <Link to="/money/create" className="btn btn-primary">
          Create New
        </Link>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <HistoryMoney pay={pay} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayMain;
