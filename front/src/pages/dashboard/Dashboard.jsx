import React from "react";
import Tobbar from "../../components/Tobbar";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div>
      <Tobbar />
      <div className="content-flex">
        <Sidebar />
        <div style={{ width: "80%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
