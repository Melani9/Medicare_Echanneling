import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ViewReports = () => {
  const { isAuthenticated } = useContext(Context);
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState({}); // Store feedback for each report

  // Fetch reports when component mounts
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/reports", {
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

  // Handle feedback submission
  const handleSendFeedback = async (reportId) => {
    if (!feedback[reportId]) {
      toast.error("Please enter feedback before sending");
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/reports/${reportId}/feedback`,
        { feedback: feedback[reportId] },
        { withCredentials: true }
      );
      toast.success(data.message);
      setFeedback((prev) => ({ ...prev, [reportId]: "" })); // Clear feedback after sending
    } catch (error) {
      toast.error("Failed to send feedback");
    }
  };

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
                  <th>Report Title</th>
                  <th>Report Date</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.patientName}</td>
                      <td>{report.email}</td>
                      <td>{report.title}</td>
                      <td>{new Date(report.date).toLocaleDateString()}</td>
                      <td>
                        <div className="feedback-section">
                          <input
                            type="text"
                            placeholder="Enter feedback"
                            value={feedback[report.id] || ""}
                            onChange={(e) =>
                              setFeedback({
                                ...feedback,
                                [report.id]: e.target.value,
                              })
                            }
                          />
                          <button
                            onClick={() => handleSendFeedback(report.id)}
                            disabled={!feedback[report.id]} // Disable if no feedback
                          >
                            Send
                          </button>
                        </div>
                      </td>
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
