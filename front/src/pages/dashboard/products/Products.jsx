import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../../context/UserContext";
const Products = () => {
  const context = useContext(User);
  const token = context.auth.token;
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
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
  const [products, setProducts] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/product/show", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setProducts(res.data);
        localStorage.setItem("products", JSON.stringify(res.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getProducts();
  }, [runUseEffect]);
  const showProducts = products.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>
        <MdDelete
          onClick={() => {
            deleteUser(item.id);
          }}
          style={{
            color: "red",
            fontSize: "20px",
            paddingRight: "4px",
            cursor: "pointer",
          }}
        />
        <Link to={`${item.id}`}>
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
        <tbody>{showProducts}</tbody>
      </table>
    </div>
  );
};

export default Products;
