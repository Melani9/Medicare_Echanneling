import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentHistory from "../components/AppointmentHistory";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | Medicare"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm />
      <AppointmentHistory />
    </>
  );
};

export default Appointment;
