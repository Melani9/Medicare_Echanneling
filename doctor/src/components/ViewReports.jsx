// src/components/ViewReports.jsx
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ViewReports = () => {
  const { isAuthenticated } = useContext(Context);
  const [reports, setReports] = useState([]);

  // Fetch reports when component mounts
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/fetch-reports", {
          withCredentials: true,
        });
        setReports(res.data.reports || []); // Ensure empty array if no data
      } catch (error) {
        toast.error("Failed to fetch reports");
        setReports([]); // Fallback to empty array if error occurs
      }
    };

    fetchReports();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="report-page"> {/* Wrapper for styling */}
      <section className="page">
        <section className="container report-list">
          <img src="/logo.png" alt="logo" className="logo" />
          <h1 className="title">Patient Reports</h1>
          <div className="report-table">
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Email</th>
                  <th>Description</th>
                  <th>Report</th>
                  <th>Time Submitted</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <tr key={report._id}>
                      <td>{report.patientName}</td>
                      <td>{report.email}</td>
                      <td>{report.description}</td>
                      <td>
                        <a href={report.reportUrl} target="_blank" rel="noopener noreferrer">
                          Download Report
                        </a>
                      </td>
                      <td>{new Date(report.submittedAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No reports available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </section>
  );
};

export default ViewReports;
