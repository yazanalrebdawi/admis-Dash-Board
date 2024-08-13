import React, { useContext, useState, useEffect } from "react";
import "../../../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../../context/UserContext";
const UpdateProducts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();
  const context = useContext(User);
  const token = context.auth.token;
  const id = window.location.pathname.split("/").slice(-1)[0];
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/product/showbyid/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        setTitle(res.data[0].title);
        setDescription(res.data[0].description);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getProducts();
  }, []);
  async function submit(ele) {
    ele.preventDefault();
    setAccept(true);
    // cookie
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      let response = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,

        formData,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      nav("/dashboard/products");
    } catch (error) {
      console.log(error);
      setAccept(true);
    }
  }
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
              <label htmlFor="name">Title:</label>
              <input
                type="text"
                id="title"
                placeholder="Title..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />{" "}
              {title.length < 1 && accept && (
                <p className="error">Title must be more than 2 char</p>
              )}
              <label htmlFor="email">Description:</label>
              <input
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                id="description"
                placeholder="Description..."
                required
                value={description}
              />
              {/* {accept && emailError === 422 && (
                <p className="error">Email is already been taken</p>
              )} */}
              <label htmlFor="password">Image:</label>
              <input
                onChange={(e) => {
                  setImage(e.target.files.item(0));
                }}
                type="file"
                id="image"
                placeholder="Image..."
              />
              {/* {password.length < 8 && accept && (
                <p className="error">Password must be more than 8 char</p>
              )}
             */}
              <div style={{ textAlign: "center" }}>
                <button type="submit" style={{ width: "100%" }}>
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProducts;
