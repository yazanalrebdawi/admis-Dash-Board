import React, { useContext } from "react";
import Header from "../../components/Header";
import Cookies from "universal-cookie";

const Home = () => {
  // const cooke = new Cookies();

  // const getUsersFromCookie = cooke.get("Bearer");
  // console.log(getUsersFromCookie);
  const UsersInfo = JSON.parse(localStorage.getItem("mySessions"));
  const products = JSON.parse(localStorage.getItem("products"));
  console.log(products);
  return (
    <div>
      {" "}
      <Header />
      <table>
        <thead>
          <th>Users</th>
          <th>email</th>
        </thead>
        <tbody>
          {UsersInfo.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}{" "}
        </tbody>
      </table>
      {/* products */}
      <br />
      <table>
        <thead>
          <th>Products</th>
          <th>Description</th>
        </thead>
        <tbody>
          {products.map((prod, idx) => (
            <tr key={idx}>
              <td>{prod.title}</td>
              <td>{prod.description}</td>
            </tr>
          ))}{" "}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
