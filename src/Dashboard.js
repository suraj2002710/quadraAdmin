import React, { useState } from "react";

import { Link, Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./components/Sidebar";
import Card from './Card'
const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="wrappers-dashboard ">
      <Header />
      <Sidebar />

      <div className="content-wrapper">
        {location?.pathname === "/dashboard" && (
          <>
         <Card/>
          </>
        )}
        <Outlet />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
