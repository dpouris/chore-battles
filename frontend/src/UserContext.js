import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import baseAxios, { refreshToken } from "./helpers/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(async () => {
    const isLogged = localStorage.getItem("lgi");

    if (isLogged) {
      const response = await refreshToken();

      if (response.log_out) {
        localStorage.removeItem("lgi");
        navigate("/login");
        return;
      }

      let user_id;
      if (response.status === 200) {
        user_id = jwt_decode(response.data.access).user_id;
      }

      if (!user?.username) {
        baseAxios(`users/${user_id}/`).then((response) => {
          setUser(response.data);
        });
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
