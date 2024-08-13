import React, { useContext, useState } from "react";
import Header from "../../../components/Header";
import "../../../App.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { User } from "../../../context/UserContext";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();
  const user = useContext(User);
  async function submit(ele) {
    ele.preventDefault();
    setAccept(true);
    // cookie
    const cooke = new Cookies();
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordR,
      });
      if (response.status === 200) {
        const token = response.data.data.token;
        cooke.set("Bearer", token);
        const userDetails = response.data.data.user;
        user.setAuth({ token, userDetails });
      }
      nav("/dashboard");
    } catch (error) {
      if (error.response.status === 422) {
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
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Name..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />{" "}
              {name.length < 2 && accept && (
                <p className="error">Username must be more than 2 char</p>
              )}
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
              {accept && emailError === 422 && (
                <p className="error">Email is already been taken</p>
              )}
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
              <label htmlFor="repeat">Repeat Password:</label>
              <input
                onChange={(e) => {
                  setPasswordR(e.target.value);
                }}
                type="password"
                id="repeat"
                placeholder="Repeat Password..."
                value={passwordR}
              />
              {password.length !== passwordR.length && accept && (
                <p className="error">Password does not match</p>
              )}
              <div style={{ textAlign: "center" }}>
                <button type="submit" style={{ width: "100%" }}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
