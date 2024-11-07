import React from "react";
import Sidebar from "../Components/sidebar";
import Header from "../Components/Header";
import RefillMain from "../Components/Refill/Main";

const RefilLScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <RefillMain/>
      </main>
    </>
  );
};

export default RefilLScreen;