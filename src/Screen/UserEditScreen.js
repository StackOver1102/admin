import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import EditUserMain from "../Components/User/EditUser";
import { useParams } from "react-router-dom";

const EditUserScreen = () => {
    let { id } = useParams();
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <EditUserMain id={id} />
            </main>
        </>
    );
};
export default EditUserScreen;
