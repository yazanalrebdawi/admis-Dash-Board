import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../context/UserContext";
import axios from "axios";
import "../../../App.css";
const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();
  const context = useContext(User);
  const token = context.auth.token;

  async function submit(ele) {
    ele.preventDefault();
    setAccept(true);
    // cookie
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordR,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      nav("/dashboard/users");
    } catch (error) {
      if (error.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }

  const id = window.location.pathname.split("/").slice(-1)[0];
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);

  return (
    <div>
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
            <form
              onSubmit={submit}
              style={{ width: "100%", boxShadow: "none" }}
            >
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
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
