import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import Users from "./User";
import axios from "axios";
import { API } from "../../utils/apiUrl";

const UserMain = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true before data fetch
      const getData = await axios.get(`${API}/api/users`);
      if (getData.data) {
        setUsers(getData.data);
      } else {
        setUsers([]);
      }
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      setError(err.message); // Set error if there's a problem
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchData(); // Fetch the data when the component mounts
  }, []);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Users</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            {loading ? ( // Show loading component while loading
              <Loading />
            ) : error ? ( // Show error component if error occurs
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Users users={users} /> // Show users list once data is fetched
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserMain;
