import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {

  // Adding Kommunicate script when the component mounts
  useEffect(() => {
    (function(d, m){
        var kommunicateSettings = 
            {"appId":"17718a4e1fb2a882aaf39afda95303aa6","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); 
        s.type = "text/javascript"; 
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; 
        h.appendChild(s);
        window.kommunicate = m; 
        m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return (
    <footer style={{ backgroundColor: "#350e527e", color: "#fff", padding: "20px 0" }}>
      <div className="container">
        <div className="content" style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <img src="/logo.png" alt="logo" className="logo-img" style={{ marginBottom: "20px" }} />
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li><Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link></li>
              <li><Link to="/appointment" style={{ color: "#fff", textDecoration: "none" }}>Appointment</Link></li>
              <li><Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <FaPhone style={{ marginRight: "10px" }} />
              <span>+775989659</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
  <MdEmail style={{ marginRight: "10px" }} />
  <a href="mailto:medicare@gmail.com" style={{ textDecoration: "none", color: "inherit" }}>
    <span>medicare@gmail.com</span>
  </a>
</div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <FaLocationArrow style={{ marginRight: "10px" }} />
              <a
                href="https://maps.app.goo.gl/3cRDWgn4qAfdLY3q8"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Hapugala, Galle
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
