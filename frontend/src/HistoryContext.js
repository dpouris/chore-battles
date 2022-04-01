import { createContext, useEffect, useState } from "react";
import axios from "axios";
import baseAxios from "./helpers/axios";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(async () => {
    const historyData = await baseAxios.get("history/");

    if (history.length < historyData.data.length) {
      setHistory(historyData.data);
    }

    return;
  }, [update]);

  return (
    <HistoryContext.Provider value={{ history, setHistory, setUpdate }}>
      {children}
    </HistoryContext.Provider>
  );
};
export default HistoryContext;
