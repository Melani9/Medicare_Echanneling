import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const SubmitReports = () => {
  const [report, setReport] = useState("");
  const [file, setFile] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    // Fetch doctors from the API based on the selected department (for example, a hardcoded department id)
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/doctors?department=1");
        setDoctors(res.data.doctors);
      } catch (error) {
        toast.error("Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("report", report);
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
      toast.error(error.response.data.message);
    }
  };

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
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              Dr. {doctor.name} ({doctor.specialty})
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Submit Report</button>
      </form>
    </section>
  );
};

export default SubmitReports;
