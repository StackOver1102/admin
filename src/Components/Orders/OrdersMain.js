import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../utils/apiUrl"

const OrderMain = () => {
  //   const orderList = useSelector((state) => state.orderList);
  //   const { loading, error, orders } = orderList;
  const [orders, setOrders] = useState([])
  const fetchData = async () => {
    try {
      const getData = await axios.get(`${API}/api/orders`)
      if (getData.data) {
        setOrders(getData.data)
      }
      else {
        setOrders([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">

        <div className="card-body">
          <div className="table-responsive">
            {false ? (
              <Loading />
            ) : false ? (
              <Message variant="alert-danger">error</Message>
            ) : (
              <Orders orders={orders} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;