// components/WhatsAppIcon.js
import React from "react";
import "./WhatsAppIcon.css"; // Add a corresponding CSS file for styling

const WhatsAppIcon = () => {
  return (
    <a
      href="https://wa.me/+94775989659" // Replace with your phone number
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <img
        src="/WhatsAppIcon.png" // Add the correct path to your WhatsApp icon
        alt="Chat on WhatsApp"
      />
    </a>
  );
};

export default WhatsAppIcon;
