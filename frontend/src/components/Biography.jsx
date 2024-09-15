import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            we are................................
          </p>
          <p>We are all in 2024!</p>
          <p>Welcome to the zee medicare</p>
          <p>
            ..............................
          </p>
          <p>stay health, be happy</p>
          <p>  </p>
        </div>
      </div>
    </>
  );
};

export default Biography;