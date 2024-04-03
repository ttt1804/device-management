import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import NarBar from "./components/layout/NarBar";
import Employees from "./components/employees/Employees";
import Devices from "./components/devices/Devices";
import AddEmployee from "./components/employees/AddEmployee";
import EditEmployee from "./components/employees/EditEmployee";
import AddDevice from "./components/devices/AddDevice";
import EditDevice from "./components/devices/EditDevice";
import DeviceUsages from "./components/device-usages/DeviceUsages";
import AddDeviceUsage from "./components/device-usages/AddDeviceUsage";
import EditDeviceUsage from "./components/device-usages/EditDeviceUsage";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const user = localStorage.getItem("user");
  const access_token = localStorage.getItem("access_token");
  if (!user || !access_token) {
    return <Login />;
  }
  return (
    <main>
      {!isLoginPage && <NarBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add-employee" element={<AddEmployee />} />
        <Route path="/employees/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/devices/add-device" element={<AddDevice />} />
        <Route path="/devices/edit-device/:id" element={<EditDevice />} />
        <Route path="/device-usages" element={<DeviceUsages />} />
        <Route
          path="/device-usages/add-device-usages"
          element={<AddDeviceUsage />}
        />
        <Route
          path="/device-usages/edit-device-usage/:id"
          element={<EditDeviceUsage />}
        />
      </Routes>
    </main>
  );
}
export default App;
