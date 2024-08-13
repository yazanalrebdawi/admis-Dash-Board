import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaUserPlus, FaProductHunt } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");

  return (
    <div className="side-bar">
      <NavLink
        to={"/dashboard/users"}
        className={`item-link ${activeLink === "users" ? "active" : ""}`}
        onClick={() => {
          setActiveLink("users");
        }}
      >
        <FaUsers color="#183153" style={{ marginRight: "10px" }} />
        Users
      </NavLink>
      <NavLink
        to={"/dashboard/user/create"}
        className={`item-link ${activeLink === "  New User" ? "active" : ""}`}
        onClick={() => {
          setActiveLink("  New User");
        }}
      >
        <FaUserPlus color="#183153" style={{ marginRight: "10px" }} />
        New User
      </NavLink>
      <NavLink
        to={"/dashboard/products/"}
        className={`item-link ${activeLink === "  products" ? "active" : ""}`}
        onClick={() => {
          setActiveLink("  products");
        }}
      >
        <FaProductHunt color="#183153" style={{ marginRight: "10px" }} />
        Products
      </NavLink>
      <NavLink
        to={"/dashboard/products/create"}
        className={`item-link ${
          activeLink === "  createproducts" ? "active" : ""
        }`}
        onClick={() => {
          setActiveLink("  createproducts");
        }}
      >
        <IoMdAdd color="#183153" style={{ marginRight: "10px" }} />
        New Products
      </NavLink>
    </div>
  );
};

export default Sidebar;
