import React, { useContext, useState } from "react";
import Header from "../../../components/Header";
import "../../../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../../context/UserContext";
import Cookies from "universal-cookie";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();
  const user = useContext(User);
  const cooke = new Cookies();

  async function submit(ele) {
    ele.preventDefault();
    setAccept(true);

    try {
      let response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const token = response.data.data.token;
        const userDetails = response.data.data.user;
        cooke.set("Bearer", token);
        user.setAuth({ token, userDetails });
      }
      nav("/dashboard");
    } catch (error) {
      if (error.response.status === 401) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }
  return (
    <div>
      <Header />
      <div
        className="parent"
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          {" "}
          <div className="register  ">
            <form onSubmit={submit}>
              <label htmlFor="email">Email:</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                placeholder="Email..."
                required
                value={email}
              />
              <label htmlFor="password">Password:</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                placeholder="Password..."
                value={password}
              />
              {password.length < 8 && accept && (
                <p className="error">Password must be more than 8 char</p>
              )}
              <div style={{ textAlign: "center" }}>
                <button type="submit" style={{ width: "100%" }}>
                  Login
                </button>
              </div>{" "}
              {accept && emailError && (
                <p className="error"> Wrong Email Or Password </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
