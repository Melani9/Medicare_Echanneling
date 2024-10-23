import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import Messages from "./components/Messages";

import ViewReports from "./components/ViewReports"; // Import the ViewReports component
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, doctor, setDoctor } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/doctor/me",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data.user) {
          setIsAuthenticated(true);
          setDoctor(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error.response || error.message);
        setIsAuthenticated(false);
        setDoctor({});
      }
    };

    fetchUser();
  }, []); // Adjust dependencies to avoid issues

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reports" element={<ViewReports />} /> 
        <Route path="/messages" element={<Messages />} />
        
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
