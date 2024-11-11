import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const SubmitReports = () => {
  const [report, setReport] = useState("");
  const [file, setFile] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const validateFile = (file) => {
    const allowedExtensions = /(\.pdf|\.docx)$/i;
    if (!allowedExtensions.exec(file.name)) {
      toast.error("Invalid file type. Only PDF and DOCX files are allowed.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("description", report);
    formData.append("file", file);
    formData.append("doctor", selectedDoctor);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      setReport("");
      setFile(null);
      setSelectedDoctor("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting report");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="submit-reports">
      <h1>Submit Reports</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={report}
          onChange={(e) => setReport(e.target.value)}
          placeholder="Describe your report"
          required
        ></textarea>

        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          required
        >
          <option value="" disabled>Select a Doctor</option>
          {!loading && doctors.length === 0 && (
            <option value="" disabled>No doctors available</option>
          )}
          {doctors.map((doctor) => (
            <option
              value={doctor._id}
              key={doctor._id}
            >
              Dr. {doctor.firstName} {doctor.lastName}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile && validateFile(selectedFile)) {
              setFile(selectedFile);
            } else {
              setFile(null);
            }
          }}
          required
        />
        <button type="submit">Submit Report</button>
      </form>
    </section>
  );
};

export default SubmitReports;
