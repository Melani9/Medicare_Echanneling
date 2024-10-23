import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentHistory from "../components/AppointmentHistory";


const Appointment = ({ title, imageUrl }) => {
  return (
    <div className="hero-container">
      <h1>{"Schedule Your Appointment | Medicare"}</h1>
      <img src={"/signin.png"} alt="Hero" className="hero-image" />
      <AppointmentForm />
      <AppointmentHistory />
    </div>
  );
};


export default Appointment;
