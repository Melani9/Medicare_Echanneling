import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Welcome to our e-Channeling platform, where we're transforming healthcare scheduling. Say goodbye to long lines and limited access. Our platform provides equal access for all users, with real-time updates and the ability to change channel numbers ahead of schedule. With a secure system for communication and feedback, we're enhancing the healthcare experience for everyone. Join us as we revolutionize appointment scheduling with our user-friendly platform.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          
        </div>
      </div>
    </>
  );
};

export default Hero;