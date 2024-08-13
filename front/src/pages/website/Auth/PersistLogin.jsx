import { Outlet } from "react-router-dom";
import { User } from "../../../context/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../../components/Loading";
import Cookies from "universal-cookie";
export default function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const context = useContext(User);
  const token = context.auth.token;
  const cooke = new Cookies();
  const getCooke = cooke.get("Bearer");
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: {
              Authorization: "Bearer " + getCooke,
            },
          })
          .then((data) => {
            cooke.set("Bearer", data.data.token);
            context.setAuth((prev) => {
              return {
                userDetails: data.data.user,
                token: data.data.token,
              };
            });
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);
  return loading ? <Loading /> : <Outlet />;
}
