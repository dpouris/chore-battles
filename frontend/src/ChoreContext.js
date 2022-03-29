import React, { createContext, useEffect, useState } from "react";
import { newFetch, refreshToken } from "./helpers/helpers";

const ChoreContext = createContext();

export const ChoreProvider = ({ children }) => {
  const [choreList, setChoreList] = useState([]);

  useEffect(async () => {
    let choreData = await newFetch("chores");
    !choreData.detail && setChoreList(choreData);

    if (choreData.detail) {
      const refresh = localStorage.getItem("refresh");
      await refreshToken(refresh);
      choreData = await newFetch("chores");
      !choreData.detail && setChoreList(choreData);
    }

    return;
  }, []);

  return (
    <ChoreContext.Provider value={{ choreList, setChoreList }}>
      {children}
    </ChoreContext.Provider>
  );
};

export default ChoreContext;
