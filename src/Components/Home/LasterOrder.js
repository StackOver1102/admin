import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../LoadingError/LoadingError";
import { formatToVND } from "../../utils/formatMoney";

const TopOrder = (props) => {
  const { data } = props;
  console.log("🚀 ~ TopOrder ~ data:", data)
 
  return (
    <div className="card-body">
      <h4 className="card-title">Top Order</h4>
        <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Last Order Date</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>
                  {item.user?.name || "Unknown User"}
                  </td>
                  <td>{item.orderCount}</td>
                  <td>${formatToVND(item.totalSpent.toFixed(2))}</td>
                  <td>{moment(item.lastOrderDate).format("YYYY-MM-DD")}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No top orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      
    </div>
  );
};

export default TopOrder;