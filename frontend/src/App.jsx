import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Header from "./components/header";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Doctors from "./components/Doctors";
import AppointmentHistory from "./components/AppointmentHistory";
import SubmitReports from "./components/SubmitReports";
import { GrDashboard } from "react-icons/gr";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Attempting to fetch user data...");
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        console.log("User data fetched successfully:", response.data);
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        console.log("Error details:", error.response ? error.response.data : error.message);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointmenthistory" element={<AppointmentHistory />} />
          <Route path="/submitreports" element={<SubmitReports />} /> 
          
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
