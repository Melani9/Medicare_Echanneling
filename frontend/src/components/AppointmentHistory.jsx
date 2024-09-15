import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import "./AppointmentHistory.css";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/user/appointments",
          { withCredentials: true }
        );
        // Sort appointments by date (latest first)
        const sortedAppointments = data.appointments.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setAppointments(sortedAppointments);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchAppointments();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page appointment-history">
      <h1>Appointment History</h1>
      <div className="appointments">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Time</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.notes || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Appointments Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AppointmentHistory;
