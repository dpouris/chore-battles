import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
// import { useNavigate } from "react-router-dom";
import baseAxios, { refreshToken } from "../helpers/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // const navigate = useNavigate();

  useEffect(async () => {
    const isLogged = localStorage.getItem("lgi");

    if (isLogged) {
      const response = await refreshToken();

      let user_id;
      let scoreId;
      if (response.status === 200) {
        user_id = jwt_decode(response.data.access).user_id;
      }

      if (!user?.username) {
        baseAxios(`users/${user_id}/`).then((response) => {
          const userInfo = response.data;
          setUser(userInfo);
          // scoreId = response.data.score;
          // baseAxios(`score/${scoreId}/`).then((response) => {
          //   console.log(response.data);
          //   setUser({ ...userInfo, score: response.data.score });
          // });
        });
      }
    }

    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
