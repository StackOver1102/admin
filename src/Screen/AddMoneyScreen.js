import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import AddMoneyMain from "./../Components/Money/AddMoney";

const AddMoney = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddMoneyMain />
      </main>
    </>
  );
};

export default AddMoney;