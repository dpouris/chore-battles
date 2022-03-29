import React, { createContext, useEffect, useState } from "react";
import { fetchUserDetails, refreshToken } from "./helpers/helpers";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(async () => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    !refresh && navigate("/login");

    refreshToken(refresh);

    if (!user.username) {
      const user_id = jwt_decode(access).user_id;
      const user_details = await fetchUserDetails(user_id, access);
      setUser(user_details);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
