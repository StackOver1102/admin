import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import MoneyMain from "../Components/Money/MoneyMain";

const MoneyScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MoneyMain />
      </main>
    </>
  );
};

export default MoneyScreen;