

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

