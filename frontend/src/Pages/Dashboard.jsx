/*import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
//import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { MdHistory } from "react-icons/md"; 
import { MdReport } from "react-icons/md"; 
const Dashboard = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/admin/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const navigate = useNavigate();

  const gotoHomePage = () => {
    navigate("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigate("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigate("/messages");
    setShow(!show);
  };
  const gotoAppointmentHistory = () => {
    navigate("/appointmenthistory");
    setShow(!show);
  };
  const gotoSubmitReports = () => {
    navigate("/submitreports");
    setShow(!show);
  };

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdReport onClick={gotoSubmitReports} />
          <MdHistory onClick={gotoAppointmentHistory} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Dashboard;*/

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const EditUserDetails = () => {
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const { isAuthenticated } = useContext(Context);

  // Fetch current user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/patient/me", {
          withCredentials: true,
        });
        setUserDetails({
          name: res.data.user.name || "", // Avoid setting null/undefined values
          email: res.data.user.email || ""
        });
      } catch (error) {
        toast.error("Failed to load user details");
      }
    };

    fetchUserDetails();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("password", newPassword); // Add the new password if provided
    if (profileImage) {
      formData.append("profileImage", profileImage); // Include the new profile image if uploaded
    }

    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/user/edit-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure multipart for file uploads
          },
          withCredentials: true,
        }
      );
      toast.success("User details updated successfully!");
    } catch (error) {
      toast.error("Failed to update user details");
    }
  };

  // Handle user input change
  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="edit-user-details">
      <h2>Edit Your Details</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name Input */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name" // Use 'name' attribute to identify the field
            value={userDetails.name}
            onChange={handleInputChange} // Handle the change for name
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email" // Use 'name' attribute to identify the field
            value={userDetails.email}
            onChange={handleInputChange} // Handle the change for email
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password">New Password (optional):</label>
          <input
            type="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} // Update new password
            placeholder="Leave blank if not changing"
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <label htmlFor="profileImage">Upload Profile Image:</label>
          <input
            type="file"
            id="profileImage"
            onChange={(e) => setProfileImage(e.target.files[0])} // Set the selected image file
            accept="image/*" // Accept only image files
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Save Changes</button>
      </form>
    </section>
  );
};

export default EditUserDetails;

