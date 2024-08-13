import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const Header = () => {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const handleLogOut = async function () {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: { Authorization: "Bearer " + token },
      });
      cookie.remove("Bearer");
      window.location.pathname = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container shadow">
      <nav className="d-flex p-2 ">
        <div className="d-flex ">
          <h6>Home</h6>
          <h6>About</h6>
        </div>
        <div className="d-flex">
          {!token ? (
            <>
              {" "}
              <Link
                to="/register"
                className="register-nav"
                style={{ textAlign: "center" }}
              >
                Register
              </Link>
              <Link
                to="/login"
                Link
                className="register-nav"
                style={{ textAlign: "center" }}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {" "}
              <Link
                to="/dashboard"
                Link
                className="register-nav"
                style={{ textAlign: "center" }}
              >
                Dashboard
              </Link>
              <div className="register-nav" onClick={handleLogOut}>
                Log Out
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
