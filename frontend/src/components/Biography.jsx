import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          
          <h3>Our Services</h3>
          <p>
          *Book Appointments Online



          </p>
          <p>*Updates on waiting times and doctor availability in real-time</p>
          <p>*Enable Patients to Adjust Their Schedules</p>
          <p>
             *Automated Scheduling 
          </p>
          <p>stay health, be happy</p>
          <p>  </p>
        </div>
      </div>
    </>
  );
};

export default Biography;