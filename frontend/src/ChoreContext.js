import React, { createContext, useEffect, useState } from "react";
import baseAxios from "./helpers/axios";
const ChoreContext = createContext();

export const ChoreProvider = ({ children }) => {
  const [choreList, setChoreList] = useState([]);

  useEffect(async () => {
    const choreData = await baseAxios.get("chores/");

    setChoreList(choreData.data);
  }, []);

  return (
    <ChoreContext.Provider value={{ choreList, setChoreList }}>
      {children}
    </ChoreContext.Provider>
  );
};

export default ChoreContext;
