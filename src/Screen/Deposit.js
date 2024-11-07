import React from "react";
import Sidebar from "../Components/sidebar";
import Header from "../Components/Header";
import DepositMain from "../Components/Deposit/Main";

const DepositScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <DepositMain/>
      </main>
    </>
  );
};

export default DepositScreen;