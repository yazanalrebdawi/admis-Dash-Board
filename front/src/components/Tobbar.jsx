import React from "react";
import { Link } from "react-router-dom";
const Tobbar = () => {
  return (
    <div className="d-flex shadow ">
      <h1>Store</h1>
      <Link to="/" className="register-nav">
        Go To Website
      </Link>
    </div>
  );
};

export default Tobbar;
