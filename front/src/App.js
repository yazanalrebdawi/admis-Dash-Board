import { Route, Routes } from "react-router-dom";
// Auth
import Signup from "./pages/website/Auth/Signup";
import Login from "./pages/website/Auth/Login";
// Home
import Home from "./pages/website/Home";
// DashBoard
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/dashboard/users/Users";
import UpdateUser from "./pages/dashboard/users/UpdateUser";
import CreateUser from "./pages/dashboard/users/CreateUser";
import RequireAuth from "./pages/website/Auth/RequireAuth";
import PersistLogin from "./pages/website/Auth/PersistLogin";
import Products from "./pages/dashboard/products/Products";
import NewProducts from "./pages/dashboard/products/NewProducts";
import UpdateProducts from "./pages/dashboard/products/UpdateProducts";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<Dashboard />} path="/dashboard">
              <Route element={<Users />} path="users" />
              <Route element={<UpdateUser />} path="users/:id" />
              <Route element={<CreateUser />} path="user/create" />
              <Route element={<Products />} path="products" />
              <Route element={<UpdateProducts />} path="products/:id" />
              <Route element={<NewProducts />} path="products/create" />
            </Route>
          </Route>
        </Route>
        {/* public routes */}
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/register" />
      </Routes>
    </div>
  );
}

export default App;
