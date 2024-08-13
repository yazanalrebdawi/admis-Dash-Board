import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";
import axios from "axios";
import Cookies from "universal-cookie";

import { Link } from "react-router-dom";
import { User } from "../../../context/UserContext";
const Users = () => {
  const cooke = new Cookies();

  const context = useContext(User);
  const token = context.auth.token;
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        setRunUseEffect((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [users, setUsers] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/user/show", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setUsers(res.data);

        // cooke.set("Bearer", res.data);
        localStorage.setItem("mySessions", JSON.stringify(res.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUsers();
  }, [runUseEffect]);
  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <MdDelete
          onClick={() => {
            deleteUser(user.id);
          }}
          style={{
            color: "red",
            fontSize: "20px",
            paddingRight: "4px",
            cursor: "pointer",
          }}
        />
        <Link to={`http://localhost:3000/dashboard/users/${user.id}`}>
          <MdBrowserUpdated
            style={{ color: "#74afb9", fontSize: "20px", cursor: "pointer" }}
          />
        </Link>
      </td>
    </tr>
  ));

  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
};

export default Users;
