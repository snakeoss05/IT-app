import React from "react";

import Sidebar from "./components/Sidebar.js";
import Dashboard from "./Pages/Dashboard.js";
import Tickets from "./Pages/Tickets.js";
import Login from "./Pages/Login.js";
import Account from "./Pages/Account.js";
import Historique from "./Pages/Historique.js";
import Stock from "./Pages/Stock.js";

import { Route, Routes } from "react-router-dom";

function Dashboarde() {
  return (
    <>
      <Sidebar />
      <div className="ps-64">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </>
  );
}

export default Dashboarde;
