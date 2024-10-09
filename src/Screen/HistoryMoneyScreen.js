import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import HistoryMain from "../Components/Money/HistoryMain";

const HistoryMoneyScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <HistoryMain />
      </main>
    </>
  );
};

export default HistoryMoneyScreen;