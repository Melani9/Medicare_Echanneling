// Navbar.jsx

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
//import { Link, useHistory } from "react-router-dom";
//import userlogin from  "./userlogin.png"

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:8000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };
  
/*
  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
            
          ) : (
            <div className="login-container">
              <img src="/userlogin.png" alt="userlogin" className="userlogin-img" />
              <button className="loginBtn btn" onClick={goToLogin}>
                LOGIN
              </button>
            </div>
            /*<button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
            
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};*/
return (
  <>
    <nav className={"container"}>
      <div className="logo">
        <img src="/logo.png" alt="logo" className="logo-img" />
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"} onClick={() => setShow(!show)}>
            Home |
          </Link>
          <Link to={"/appointment"} onClick={() => setShow(!show)}>
            Appointment |
          </Link>
          <Link to={"/doctors"} onClick={() => setShow(!show)}>
            Doctors |
          </Link>
          <Link to={"/submitreports"} onClick={() => setShow(!show)}>
            Submit Reports
          </Link>
          
        </div>
        {isAuthenticated ? (
          <div className="login-container">
            <Link to={"/Dashboard"} onClick={() => setShow(!show)}>
                <img src="/userlogin.png" alt="userlogin" className="userlogin-img" />
              </Link>
              
            
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        ) : (
          <button className="loginBtn btn" onClick={goToLogin}>
            LOGIN
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  </>
);
};
export default Navbar;
